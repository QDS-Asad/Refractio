const UserService = require('../services/user.service');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const generalRegisterValidation = require('../middlewares/generalRegister.middleware')
const { validationResult } = require('express-validator');
//const UserOTPVerification = require('../models/userOtpVerification');
const userOtpVerification = require('../models/userOtpVerification');


exports.register = async (req, res, next) =>{
    //const errors = validationResult(req);
    //   if (!errors.isEmpty()) {
    //     res.status(422).json({ errors: errors.array() });
    //     return;
    //   }
    const {fullName, email, password} = req.body;

    if(!fullName){
       return res.status(400).send({
            status: "error",
            error: "Fullname is required"
        })
    }

    if(!email){
       return res.status(400).send({
            status:"error",
            error:"Email is required"
        })
    }

    if(!password) {
        return res.status(400).send({
            status: "error",
            error: "Password is required"
        });
    }


    if(password.length < 5){
        return res.status(400).send({
            status: "error",
            error: "Password too small. Should be atleat 6 characters"
        });
    }

    const passwordhash = await bcrypt.hash(password, 10);
    try {
        await UserService.signUp(fullName, email, passwordhash).then((result)=>{
            let email = result.email;
            let id = result.id;
        //     sendOTPVerficationEmail({id, email}, res).then((result)=>{
        //         console.log("email send result", result)
        //        res.status(200).send({
        //            result
        //        })
        //    });
            return res.status(200).send({
                status:"User created successfully"
            })
        }).catch((error)=>{
           res.status(500).send({
               status:"error", 
               message:error.message       
           })
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status:'error',
            message:"Something went wrong"
        })
    }
}

exports.login = async(req, res)=>{
    const {email, password} = req.body;
    if(!email){
        return res.status(400).send({
            status:"error",
            error:"Email is required"
        })
    }

    if(!password){
        return res.status(400).send({
            status:"error",
            error:"Password is required"
        })
    }
      try {
          let user = await UserService.login(email, password);
          if(!user){
              res.status(200).json({
                  message:"User does not exists"
              })
          }
          if (user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign(
              {_id: user._id, email },
              process.env.TOKEN_KEY,
              {
                expiresIn: "2h",
              }
            );
            user.token = token;
            let userData ={
                id:user._id,
                fullName: user.fullName,
                email: user.email,
                verified:user.verified,
                token: token,
            }
              res.status(200).send(userData)
          }
          if(user && !(await bcrypt.compare(password, user.password))){
              res.status(200).json({
                  message:"Invalid Credentials"
              })
          }
      } catch (error) {
        return res.status(500).send({
            status:'error',
            message:"Something went wrong"
        })
      }
}

//transporter for nodemailer
let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.MAIL_USERNAME,
        pass:process.env.MAIL_PASSWORD
    }
});

transporter.verify((error, success)=>{
    if(error){
        console.log(error);
    }else{
        console.log("Ready for messages");
        console.log(success);
    }
});

//send otp verification email
const sendOTPVerficationEmail = async({id, email}, res)=>{
   
    try {
        const otp = `${Math.floor(1000 + Math.random()*9000)}`;
        
        //mail options
        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: email,
            subject: "Verify Your Email",
            html: `<p>Enter <b>${otp}</b> in the app to verify your email and complete the registration process.</p>`,
            text: `<p>This code <b>expires in 1 hour</b></p>`,
        };

        //hash the otp
        const saltRounds = 10;
        const hashedOTP = await bcrypt.hash(otp, saltRounds);

       
        let userId=id;
        let hashotp=hashedOTP;
        let createdAt = Date.now();
        let expiresAt = Date.now()+3600000;
        
        //saving data for otpverification
        await UserService.userOtpVerification(userId, hashotp, createdAt, expiresAt);

        await transporter.sendMail(mailOptions);
        return {
            status: "PENDING",
            message: "Verification otp email sent.",
            data:{
                userId: id,
                email
            }
        }
    } catch (error) {
        res.send({
            status:"FAILED",
            message: error.message
        });
    }
}

// exports.verifyOtp = async(req, res)=>{
// try {
//       let {userId, otp} = req.body;
//       if(!userId || !otp){
//           throw Error("Empty otp details are not allowed");
//       } else {
//         let userOtpRecords = await UserService.verfiyOtp(userId, otp);
//         if(userOtpRecords.length <= 0){
//             throw new Error(
//                 "Account record doesn't exists or has been verfied already. Please sign up or log in."
//             )
//         } 
//       } 
// } catch (error) {
    
// }
// }