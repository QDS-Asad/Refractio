const UserService = require('../services/user.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const generalRegisterValidation = require('../middlewares/generalRegister');
const { validationResult } = require('express-validator');
const userOtpVerification = require('../models/userOtpVerification');
const { User } = require('../models/user');
const { UserOTPVerification } = require('../models/userOtpVerification');
const {MetaData} = require('../models/projectmetadata');

exports.register = async (req, res, next) => {
  const { fullName, email, password, roles } = req.body;
  const passwordhash = await bcrypt.hash(password, 10);
  try {
    await UserService.getUserByEmail(email).then(async (user) => {
      if (user) {
        if (user.verified) {
          res.status(400).send({
            message: 'You already registered!',
          });
        } else {
          sendOTPVerficationEmail({ id: user.id, email: email }, res).then(
            (result) => {
              console.log('email send result', result, 'alerady register');
              res.status(200).send({
                result,
              });
            }
          );
        }
      } else {
        await UserService.signUp(fullName, email, passwordhash, roles)
          .then((result) => {
            let email = result.email;
            let id = result.id;
            sendOTPVerficationEmail({ id, email }, res).then((result) => {
              console.log('email send result', result);
              res.status(200).send({
                result,
              });
            });
            // return res.status(200).send({
            //     status:"User created successfully"
            // })
          })
          .catch((error) => {
            res.status(500).send({
              status: 'error',
              message: error.message,
            });
          });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error',
      message: 'Something went wrong',
      data: null,
      description: error,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await UserService.login(email, password);
    if (!user) {
      res.status(401).send({
        message: 'User does not exists',
      });
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ _id: user._id, email }, process.env.TOKEN_KEY, {
        expiresIn: '2h',
      });
      user.token = token;
      let userData = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        roles: user.roles,
        verified: user.verified,
        token: token,
      };
      res.status(200).send(userData);
    }
    if (user && !(await bcrypt.compare(password, user.password))) {
      res.status(401).send({
        status: 'Unauthorized',
        message: 'Invalid credentials',
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: 'error',
      message: 'Something went wrong',
      data: null,
      description: error,
    });
  }
};

//transporter for nodemailer
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Ready for messages');
    console.log(success);
  }
});

//send otp verification email
const sendOTPVerficationEmail = async ({ id, email }, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    //mail options
    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: 'Verify Your Email',
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Refractio</a>
              </div>
              <p style="font-size:1.1em">Hi,</p>
              <p>Thank you for choosing Refractio. Use the following OTP to complete your Sign Up procedures. OTP is valid for 1 hour.</p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
              <p style="font-size:0.9em;">Regards,<br />Refractio</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Refractio Inc</p>
                <p>Address</p>
                <p>City</p>
              </div>
            </div>
          </div>`,
    };

    //hash the otp
    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otp, saltRounds);

    let userId = id;
    let hashotp = hashedOTP;
    let createdAt = Date.now();
    let expiresAt = Date.now() + 3600000;

    //saving data for otpverification
    await UserService.userOtpVerification(
      userId,
      hashotp,
      createdAt,
      expiresAt
    );

    await transporter.sendMail(mailOptions);
    return {
      status: 'PENDING',
      message: 'Verification otp email sent.',
      data: {
        userId: id,
        email,
      },
    };
  } catch (error) {
    res.status(500).send({
      status: 'error',
      message: 'Something went wrong',
      data: null,
      description: error,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    let { userId, otp } = req.body;
    console.log
    if (!userId || !otp) {
      throw Error('Empty otp details are not allowed');
    }
    const hashedOTP = otp;
    let userOtpRecords = await UserService.verfiyOtp(userId);
    if (!userOtpRecords) {
      // no record found
      throw new Error(
        "Account record doesn't exists or has been verfied already. Please sign up or log in."
      );
    } else {
      const { expiresAt, otp } = userOtpRecords;
      if (expiresAt < Date.now()) {
        //user otp record has expired
        await UserService.deleteExpiredOtp(userId);
        throw new Error('Code has expired. Please request again.');
      } else {
        const validOtp = await bcrypt.compare(hashedOTP.toString(), otp);
        if (!validOtp) {
          throw new Error('Invalid code passed. Check your inbox.');
        } else {
          await User.updateOne({ _id: userId }, { verified: true });
          await UserOTPVerification.deleteMany({ userId });

          res.status(200).send({
            status: 'Verified',
            message: 'User email verified successfully.',
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'Failed',
      message: error.message,
      data: null,
      description: error,
    });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await UserService.getUserByEmail(email);
    if (!user) {
      res.status(400).send({
        status: 'Error',
        message: 'Email does not exists.',
      });
    }
    if (email !== user.email) {
      res.status(400).send({
        status: 'Error',
        message: 'User not registered',
      });
    }

    //User exists and now create a One time link valid for 15 mins

    const secret = process.env.TOKEN_KEY + user.password;

    const payload = {
      email: user.email,
      id: user.id,
    };
    let id = user.id;
    let createdAt = Date.now();
    let expiresAt = Date.now() + 3600000;
    const token = jwt.sign(payload, secret, { expiresIn: '15m' });
    let result = await UserService.userToken(id, token, createdAt, expiresAt);

    //Send Frontend URL Here
    const link = `http://54.185.166.224/auth/new-password/${token}`;

    //mail options
    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: 'Refractio password reset link',
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Refractio</a>
              </div>
              <p style="font-size:1.1em">Hi,</p>
              <p>Please use this link to reset your password</p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"><a href="${link}" style="color:#ffff;text-decoration:none;">Reset Your Password</a></h2>
              <p style="font-size:0.9em;">Regards,<br />Refractio</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Refractio Inc</p>
                <p>Address</p>
                <p>City</p>
              </div>
            </div>
          </div>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({
      status: 'Success',
      message: 'Password reset link sent to your mail.',
      data: {
        userId: id,
        email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'Failed',
      message: error.message,
      data: null,
      description: error,
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;
  let usertoken = await UserService.getUserByToken(token);
  if (!usertoken) {
    res.status(400).send({
      status: 'Error',
      message: 'Token is Invalid.',
    });
  }
  if (usertoken) {
    let { userId } = usertoken;
    let user = await UserService.getUserById(userId);
    if (newPassword !== confirmPassword) {
      res.status(400).send({
        status: 'error',
        message: 'Password does not match.',
      });
    }
    let newPasswordHash = await bcrypt.hash(newPassword, 10);
    let result = await UserService.modifyUserPassword(userId, newPasswordHash);
    if (result) {
      res.status(200).send({
        status: 'Success',
        message: 'Password updated successfully.',
      });
    }
  }
};

exports.resendOtp = async (req, res) => {
  const {id, email} = req.body;
  await UserOTPVerification.deleteMany({ id });
  await sendOTPVerficationEmail({ id, email }, res).then((result) => {
    res.status(200).send({
      result,
    });
  });
};

exports.getMetaData = async(req, res)=>{
let result = await MetaData.find();
return res.status(200).send({
  status:"Success",
  data:result
})
}
