const UserService = require('../services/user.service');
const RoleService = require('../services/role.service');
const jwt = require('jsonwebtoken');
const { crypto_encrypt, crypto_decrypt } = require('../helpers/encryption_helper');
const { successResp, errorResp, serverError } = require('../helpers/error_helper');
const { ERROR_MESSAGE, HTTP_STATUS, SUCCESS_MESSAGE, ROLES, SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD, JWT_KEY, VERIFY_REGISTER_EMAIL_TEMPLATE, FORGOT_PASSWORD_EMAIL_TEMPLATE, CLIENT_HOST, EMAIL_TYPES, TOKEN_EXPIRY, JWT_EXPIRY, JWT_EXPIRY_REMEMBER_ME } = require('../lib/constants');

// register admin user
exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  req.body.password = crypto_encrypt(password);
  try {
    await UserService.getUserByEmail(email).then(async (user) => {
      if (user) {
        if (user.isVerified) {
          return errorResp(res, { msg: ERROR_MESSAGE.ALLREADY_REGISTERED, code: HTTP_STATUS.BAD_REQUEST.CODE })
        } else {
          const userData = {

          }
          tokenVerificationEmail(EMAIL_TYPES.VERIFY_REGISTER, user, res);
        }
      } else {
        const role = await RoleService.getRoleByRoleId(ROLES.ADMIN);
        await UserService.register({ ...req.body, roleId: role._id }).then((result) => {
          tokenVerificationEmail(EMAIL_TYPES.VERIFY_REGISTER, result, res);
        }).catch((error) => {
          serverError(res, error)
        });
      }
    }).catch((error) => {
      serverError(res, error)
    });
  } catch (error) {
    serverError(res, error);
  }
};

// generic email for register and forgot password
const tokenVerificationEmail = async (type, user, res) => {
  user.token = crypto_encrypt(`${Math.floor(1000 + Math.random() * 9000)}`);
  const tokenExpiry = Date.now() + TOKEN_EXPIRY;
  user.html = getEmailTemplate({ type, token: user.token });
  console.log(user);
  await UserService.tokenVerificationEmail(user).then(async (result) => {
    if (!result) {
      return errorResp(res, { msg: ERROR_MESSAGE.EMAIL_SENT_FAILED, code: HTTP_STATUS.BAD_REQUEST.CODE })
    }
    await UserService.updateUserById(user._id, { token: user.token, tokenExpiry });
    let data = type == EMAIL_TYPES.VERIFY_REGISTER && { userId: user._id, email: user.email, isVerified: user.isVerified } || undefined;
    return successResp(res, { msg: SUCCESS_MESSAGE.EMAIL_SENT, code: HTTP_STATUS.SUCCESS.CODE, data })
  }).catch((error) => {
    serverError(res, error)
  });
}

exports.resendToken = async (req, res) => {
  const { userId } = req.body;
  try {
    await UserService.getUserById(userId).then(async (user) => {
      if (user) {
        if (user.isVerified) {
          return errorResp(res, { msg: ERROR_MESSAGE.ALLREADY_VERIFIED, code: HTTP_STATUS.BAD_REQUEST.CODE })
        } else {
          tokenVerificationEmail(EMAIL_TYPES.VERIFY_REGISTER, user, res);
        }
      } else {
        return errorResp(res, { msg: ERROR_MESSAGE.NOT_FOUND, code: HTTP_STATUS.NOT_FOUND.CODE })
      }
    }).catch((error) => {
      serverError(res, error)
    });
  } catch (error) {
    serverError(res, error);
  }
};

// email templates
const getEmailTemplate = (obj) => {
  switch (obj.type) {
    case EMAIL_TYPES.VERIFY_REGISTER:
      return VERIFY_REGISTER_EMAIL_TEMPLATE({ token: crypto_decrypt(obj.token) })
      break;
    case EMAIL_TYPES.FORGOT_PASSWORD:
      const link = `${CLIENT_HOST}/auth/new-password/${obj.token}`;
      return FORGOT_PASSWORD_EMAIL_TEMPLATE({ link })
      break;
  }
}

// verify register token
exports.verifyToken = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    await UserService.getUserById(userId).then(async (user) => {
      const { token, tokenExpiry } = user;
      if (tokenExpiry < Date.now()) {
        return errorResp(res, { msg: ERROR_MESSAGE.TOKEN_EXPIRED, code: HTTP_STATUS.BAD_REQUEST.CODE });
      }
      if (otp !== crypto_decrypt(token)) {
        return errorResp(res, { msg: ERROR_MESSAGE.INVALID_TOKEN, code: HTTP_STATUS.BAD_REQUEST.CODE })
      }
      await UserService.updateUserById(userId, { isVerified: true, canLogin: true, status: "subscription_pending", token: "", tokenExpiry: null }).then(() => {
        return successResp(res, { msg: SUCCESS_MESSAGE.ACTIVATION_MAIL_VERIFIED, code: HTTP_STATUS.SUCCESS.CODE })
      })

    }).catch((error) => {
      errorResp(res, { msg: ERROR_MESSAGE.NOT_FOUND, code: HTTP_STATUS.NOT_FOUND.CODE })
    });
  } catch (error) {
    serverError(res, error)
  }
};

// login user
exports.login = async (req, res) => {
  try {
    await UserService.login(req.body).then(async (user) => {
      if (!user) {
        return errorResp(res, { msg: ERROR_MESSAGE.INVALID_CREDS, code: HTTP_STATUS.BAD_REQUEST.CODE })
      }
      if (req.body.password !== crypto_decrypt(user.password)) {
        return errorResp(res, { msg: ERROR_MESSAGE.INVALID_CREDS, code: HTTP_STATUS.BAD_REQUEST.CODE })
      }
      const role = await RoleService.getRoleById(user.roleId);
      const expiry = req.body.rememberMe && JWT_EXPIRY_REMEMBER_ME || JWT_EXPIRY;
      const token = jwt.sign({ _id: user._id, email: user.email, roleId: role._id }, JWT_KEY, {
        expiresIn: expiry,
      });
      let userData = {};
      if(user.isVerified){
        userData = {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: {roleId:role.roleId, name: role.name},
          isVerified: user.isVerified,
          canLogin: user.canLogin,
          status: user.status,
          token: token,
        };
        return successResp(res, { msg: SUCCESS_MESSAGE.LOGIN_SUCCESS, code: HTTP_STATUS.SUCCESS.CODE, data: userData })
      }else{
        tokenVerificationEmail(EMAIL_TYPES.VERIFY_REGISTER, user, res); 
      }
    }).catch((error) => {
      errorResp(res, { msg: ERROR_MESSAGE.NOT_FOUND, code: HTTP_STATUS.NOT_FOUND.CODE })
    });
  } catch (error) {
    serverError(res, error)
  }
};

// forgot user password
exports.forgetPassword = async (req, res) => {
  try {
    await UserService.getUserByEmail(req.body.email).then(async (user) => {
      if (!user) {
        return errorResp(res, { msg: ERROR_MESSAGE.INVALID_EMAIL, code: HTTP_STATUS.BAD_REQUEST.CODE })
      } else {
        tokenVerificationEmail(EMAIL_TYPES.FORGOT_PASSWORD, user, res);
      }
    }).catch((error) => {
      return errorResp(res, { msg: ERROR_MESSAGE.NOT_FOUND, code: HTTP_STATUS.NOT_FOUND.CODE })
    })
  } catch (error) {
    serverError(res, error)
  }
};

// reset user password
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    await UserService.getUserByToken(encodeURIComponent(token)).then(async (user) => {
      const { tokenExpiry } = user;
      if (tokenExpiry < Date.now()) {
        return errorResp(res, { msg: ERROR_MESSAGE.TOKEN_EXPIRED, code: HTTP_STATUS.BAD_REQUEST.CODE });
      }
      const password = crypto_encrypt(newPassword);
      await UserService.updateUserById(user._id, { password, token: "", tokenExpiry: null }).then(() => {
        return successResp(res, { msg: SUCCESS_MESSAGE.PASSWORD_RESET_SUCCESS, code: HTTP_STATUS.SUCCESS.CODE })
      })
    }).catch((error) => {
      errorResp(res, { msg: ERROR_MESSAGE.NOT_FOUND, code: HTTP_STATUS.NOT_FOUND.CODE })
    });
  } catch (error) {
    serverError(res, error)
  }
};
