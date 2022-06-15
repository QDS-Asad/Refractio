const UserService = require("../services/user.service");
const RoleService = require("../services/role.service");
const TeamService = require("../services/team.service");
const jwt = require("jsonwebtoken");
const {
  crypto_encrypt,
  crypto_decrypt,
} = require("../helpers/encryption_helper");
const {
  successResp,
  errorResp,
  serverError,
} = require("../helpers/error_helper");
const {
  ERROR_MESSAGE,
  HTTP_STATUS,
  SUCCESS_MESSAGE,
  ROLES,
  JWT_KEY,
  VERIFY_REGISTER_EMAIL_TEMPLATE,
  FORGOT_PASSWORD_EMAIL_TEMPLATE,
  INVTE_USER_EMAIL_TEMPLATE,
  CLIENT_HOST,
  EMAIL_TYPES,
  TOKEN_EXPIRY,
  JWT_EXPIRY,
  JWT_EXPIRY_REMEMBER_ME,
  TOTAL_TEAM_MEMBERS,
  USER_STATUS,
  FORGOT_PASSWORD_EMAIL_SUBJECT,
  VERIFY_REGISTER_EMAIL_SUBJECT,
  INVTE_USER_EMAIL_SUBJECT,
} = require("../lib/constants");

// register admin user
exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  req.body.password = crypto_encrypt(password);
  try {
    await UserService.getUserByEmail(email)
      .then(async (user) => {
        if (user) {
          if (user.isVerified) {
            return errorResp(res, {
              msg: ERROR_MESSAGE.ALLREADY_REGISTERED,
              code: HTTP_STATUS.BAD_REQUEST.CODE,
            });
          } else {
            tokenVerificationEmail(res, EMAIL_TYPES.VERIFY_REGISTER, user);
          }
        } else {
          const role = await RoleService.getRoleByRoleId(ROLES.ADMIN);
          await UserService.register({ ...req.body, roleId: role._id })
            .then(async (result) => {
              const teamData = {
                createdById: result._id,
                members: [result._id],
              };
              await TeamService.createTeam(teamData)
                .then(async (teamRes) => {
                  await UserService.updateUserById(result._id, {
                    teamId: teamRes._id,
                  });
                })
                .catch((error) => {
                  serverError(res, error);
                });
              tokenVerificationEmail(res, EMAIL_TYPES.VERIFY_REGISTER, result);
            })
            .catch((error) => {
              serverError(res, error);
            });
        }
      })
      .catch((error) => {
        serverError(res, error);
      });
  } catch (error) {
    serverError(res, error);
  }
};

exports.inviteUser = async (req, res, next) => {
  const { email, roleId, user } = req.body;
  try {
    await UserService.getUserByEmail(email)
      .then(async (userRes) => {
        if (userRes) {
          if (userRes.isVerified) {
            return errorResp(res, {
              msg: ERROR_MESSAGE.ALLREADY_REGISTERED,
              code: HTTP_STATUS.BAD_REQUEST.CODE,
            });
          } else {
            return errorResp(res, {
              msg: ERROR_MESSAGE.ALLREADY_INVITED,
              code: HTTP_STATUS.BAD_REQUEST.CODE,
            });
          }
        } else {
          const role = await RoleService.getRoleByRoleId(roleId);
          const admin = await UserService.getUserById(user._id);
          const team = await TeamService.getTeamById(admin.teamId);
          await UserService.register({
            ...req.body,
            roleId: role._id,
            status: USER_STATUS.INVITE_SENT,
          })
            .then(async (result) => {
              if (team.members.length == TOTAL_TEAM_MEMBERS) {
                return errorResp(res, {
                  msg: ERROR_MESSAGE.TEAM_LIMIT_EXCEED,
                  code: HTTP_STATUS.BAD_REQUEST,
                });
              }
              const members = [...team.members, result._id];
              await TeamService.updateTeamMembers(team._id, { members })
                .then(async (teamRes) => {
                  await UserService.updateUserById(result._id, {
                    teamId: team._id,
                  });
                  tokenVerificationEmail(res, EMAIL_TYPES.INVITE_USER, result, user);
                })
                .catch((error) => {
                  serverError(res, error);
                });
            })
            .catch((error) => {
              serverError(res, error);
            });
        }
      })
      .catch((error) => {
        serverError(res, error);
      });
  } catch (error) {
    serverError(res, error);
  }
};

// generic email for register and forgot password
const tokenVerificationEmail = async (res, type, user, sender = {}) => {
  user.token = crypto_encrypt(`${Math.floor(1000 + Math.random() * 9000)}`);
  const tokenExpiry = Date.now() + TOKEN_EXPIRY;
  const newUser = getEmailTemplate({ type, token: user.token, user, senderEmail: sender.email });
  await UserService.tokenVerificationEmail(newUser)
    .then(async (result) => {
      if (!result) {
        return errorResp(res, {
          msg: ERROR_MESSAGE.EMAIL_SENT_FAILED,
          code: HTTP_STATUS.BAD_REQUEST.CODE,
        });
      }
      await UserService.updateUserById(user._id, {
        token: user.token,
        tokenExpiry,
      });
      let data =
        (type == EMAIL_TYPES.VERIFY_REGISTER && {
          userId: user._id,
          email: user.email,
          isVerified: user.isVerified,
        }) ||
        undefined;
      return successResp(res, {
        msg: SUCCESS_MESSAGE.EMAIL_SENT,
        code: HTTP_STATUS.SUCCESS.CODE,
        data,
      });
    })
    .catch((error) => {
      serverError(res, error);
    });
};

//resend user token
exports.resendToken = async (req, res) => {
  const { userId } = req.body;
  try {
    await UserService.getUserById(userId)
      .then(async (user) => {
        if (user) {
          if (user.isVerified) {
            return errorResp(res, {
              msg: ERROR_MESSAGE.ALLREADY_VERIFIED,
              code: HTTP_STATUS.BAD_REQUEST.CODE,
            });
          } else {
            tokenVerificationEmail(res, EMAIL_TYPES.VERIFY_REGISTER, user);
          }
        } else {
          return errorResp(res, {
            msg: ERROR_MESSAGE.NOT_FOUND,
            code: HTTP_STATUS.NOT_FOUND.CODE,
          });
        }
      })
      .catch((error) => {
        serverError(res, error);
      });
  } catch (error) {
    serverError(res, error);
  }
};

// email templates
const getEmailTemplate = (obj) => {
  let link;
  switch (obj.type) {
    case EMAIL_TYPES.VERIFY_REGISTER:
      return {email: obj.user.email, subject:VERIFY_REGISTER_EMAIL_SUBJECT, html: VERIFY_REGISTER_EMAIL_TEMPLATE({
        token: crypto_decrypt(obj.token),
      })};
      break;
    case EMAIL_TYPES.INVITE_USER:
      link = `${CLIENT_HOST}/auth/invite-account/${obj.token}`;
      return {email: obj.user.email, subject: INVTE_USER_EMAIL_SUBJECT, html: INVTE_USER_EMAIL_TEMPLATE({ link, senderEmail: obj.senderEmail, recipientEmail: obj.user.email })};
      break;
    case EMAIL_TYPES.FORGOT_PASSWORD:
      link = `${CLIENT_HOST}/auth/new-password/${obj.token}`;
      return {email: obj.user.email, subject: FORGOT_PASSWORD_EMAIL_SUBJECT, html: FORGOT_PASSWORD_EMAIL_TEMPLATE({ link })};
      break;
  }
};

// verify register token
exports.verifyToken = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    await UserService.getUserById(userId)
      .then(async (user) => {
        const { token, tokenExpiry } = user;
        if (tokenExpiry < Date.now()) {
          return errorResp(res, {
            msg: ERROR_MESSAGE.TOKEN_EXPIRED,
            code: HTTP_STATUS.BAD_REQUEST.CODE,
          });
        }
        if (otp !== crypto_decrypt(token)) {
          return errorResp(res, {
            msg: ERROR_MESSAGE.INVALID_TOKEN,
            code: HTTP_STATUS.BAD_REQUEST.CODE,
          });
        }
        await UserService.updateUserById(userId, {
          isVerified: true,
          canLogin: true,
          status: USER_STATUS.SUBSCRIPTION_PENDING,
          token: "",
          tokenExpiry: null,
        }).then(() => {
          return successResp(res, {
            msg: SUCCESS_MESSAGE.ACTIVATION_MAIL_VERIFIED,
            code: HTTP_STATUS.SUCCESS.CODE,
          });
        });
      })
      .catch((error) => {
        errorResp(res, {
          msg: ERROR_MESSAGE.NOT_FOUND,
          code: HTTP_STATUS.NOT_FOUND.CODE,
        });
      });
  } catch (error) {
    serverError(res, error);
  }
};

// verify invite token
exports.verifyEmailInvite = async (req, res) => {
  try {
    const { token } = req.params;
    await UserService.getUserByToken(encodeURIComponent(token))
      .then(async (user) => {
        const { tokenExpiry } = user;
        if (tokenExpiry < Date.now()) {
          return errorResp(res, {
            msg: ERROR_MESSAGE.TOKEN_EXPIRED,
            code: HTTP_STATUS.BAD_REQUEST.CODE,
          });
        }
        const userData = {
          email: user.email,
          userId: user._id,
        };
        return successResp(res, {
          msg: SUCCESS_MESSAGE.DATA_FETCHED,
          code: HTTP_STATUS.SUCCESS.CODE,
          data: userData,
        });
      })
      .catch((error) => {
        errorResp(res, {
          msg: ERROR_MESSAGE.NOT_FOUND,
          code: HTTP_STATUS.NOT_FOUND.CODE,
        });
      });
  } catch (error) {
    serverError(res, error);
  }
};

// reset user password
exports.inviteRegister = async (req, res) => {
  try {
    const { userId } = req.params;
    const { fullName, newPassword } = req.body;
    await UserService.getUserById(userId)
      .then(async (user) => {
        const { tokenExpiry } = user;
        if (tokenExpiry < Date.now()) {
          return errorResp(res, {
            msg: ERROR_MESSAGE.TOKEN_EXPIRED,
            code: HTTP_STATUS.BAD_REQUEST.CODE,
          });
        }
        const password = crypto_encrypt(newPassword);
        const userData = {
          fullName,
          password,
          isVerified: true,
          canLogin: true,
          status: USER_STATUS.ACTIVE,
          token: "",
          tokenExpiry: null,
        };
        await UserService.updateUserById(userId, userData).then(() => {
          return successResp(res, {
            msg: SUCCESS_MESSAGE.USER_REGISTERED,
            code: HTTP_STATUS.SUCCESS.CODE,
          });
        });
      })
      .catch((error) => {
        errorResp(res, {
          msg: ERROR_MESSAGE.NOT_FOUND,
          code: HTTP_STATUS.NOT_FOUND.CODE,
        });
      });
  } catch (error) {
    serverError(res, error);
  }
};

// login user
exports.login = async (req, res) => {
  try {
    await UserService.login(req.body)
      .then(async (user) => {
        if (!user) {
          return errorResp(res, {
            msg: ERROR_MESSAGE.INVALID_CREDS,
            code: HTTP_STATUS.BAD_REQUEST.CODE,
          });
        }
        if (req.body.password !== crypto_decrypt(user.password)) {
          return errorResp(res, {
            msg: ERROR_MESSAGE.INVALID_CREDS,
            code: HTTP_STATUS.BAD_REQUEST.CODE,
          });
        }
        const role = await RoleService.getRoleById(user.roleId);
        const expiry =
          (req.body.rememberMe && JWT_EXPIRY_REMEMBER_ME) || JWT_EXPIRY;
        const token = jwt.sign(
          { _id: user._id, email: user.email, roleId: role._id },
          JWT_KEY,
          {
            expiresIn: expiry,
          }
        );
        let userData = {};
        if (user.isVerified) {
          userData = {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: { roleId: role.roleId, name: role.name },
            isVerified: user.isVerified,
            canLogin: user.canLogin,
            status: user.status,
            token: token,
          };
          return successResp(res, {
            msg: SUCCESS_MESSAGE.LOGIN_SUCCESS,
            code: HTTP_STATUS.SUCCESS.CODE,
            data: userData,
          });
        } else {
          tokenVerificationEmail(res, EMAIL_TYPES.VERIFY_REGISTER, user);
        }
      })
      .catch((error) => {
        errorResp(res, {
          msg: ERROR_MESSAGE.NOT_FOUND,
          code: HTTP_STATUS.NOT_FOUND.CODE,
        });
      });
  } catch (error) {
    serverError(res, error);
  }
};

// forgot user password
exports.forgetPassword = async (req, res) => {
  try {
    await UserService.getUserByEmail(req.body.email)
      .then(async (user) => {
        if (!user) {
          return errorResp(res, {
            msg: ERROR_MESSAGE.INVALID_EMAIL,
            code: HTTP_STATUS.BAD_REQUEST.CODE,
          });
        } else {
          tokenVerificationEmail(res, EMAIL_TYPES.FORGOT_PASSWORD, user);
        }
      })
      .catch((error) => {
        return errorResp(res, {
          msg: ERROR_MESSAGE.NOT_FOUND,
          code: HTTP_STATUS.NOT_FOUND.CODE,
        });
      });
  } catch (error) {
    serverError(res, error);
  }
};

// reset user password
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    await UserService.getUserByToken(encodeURIComponent(token))
      .then(async (user) => {
        const { tokenExpiry } = user;
        if (tokenExpiry < Date.now()) {
          return errorResp(res, {
            msg: ERROR_MESSAGE.TOKEN_EXPIRED,
            code: HTTP_STATUS.BAD_REQUEST.CODE,
          });
        }
        const password = crypto_encrypt(newPassword);
        await UserService.updateUserById(user._id, {
          password,
          token: "",
          tokenExpiry: null,
        }).then(() => {
          return successResp(res, {
            msg: SUCCESS_MESSAGE.PASSWORD_RESET_SUCCESS,
            code: HTTP_STATUS.SUCCESS.CODE,
          });
        });
      })
      .catch((error) => {
        errorResp(res, {
          msg: ERROR_MESSAGE.NOT_FOUND,
          code: HTTP_STATUS.NOT_FOUND.CODE,
        });
      });
  } catch (error) {
    serverError(res, error);
  }
};

//get team list with pagination
exports.getTeam = async (req, res, next) => {
  try {
    const { user } = req.body;
    const role = await RoleService.getRoleById(user.roleId);
    const userData = await UserService.getUserById(user._id);
    const teamData = {
      ...req.body,
      page: req.body.page,
      roleId: role.roleId,
      teamId: userData.teamId,
    };
    const filterData = await getTeamByRole(teamData);
    await TeamService.getTeam(filterData)
      .then((teamRes) => {
        return successResp(res, {
          msg: SUCCESS_MESSAGE.DATA_FETCHED,
          code: HTTP_STATUS.SUCCESS.CODE,
          data: teamRes,
        });
      })
      .catch((error) => {
        errorResp(res, {
          msg: ERROR_MESSAGE.NOT_FOUND,
          code: HTTP_STATUS.NOT_FOUND.CODE,
        });
      });
  } catch (error) {
    serverError(res, error);
  }
};

// get team according to the user role
const getTeamByRole = async (obj) => {
  let roles;
  let roleIds = [];
  if (obj.roleId !== ROLES.ADMIN) {
    roles = await RoleService.getRolesByRoleIds([ROLES.ADMIN]);
    roles.map((role) => {
      roleIds.push(role._id);
    });
  }
  return (obj = {
    ...obj,
    roleIds,
  });
};

//resend invite email
exports.resendInvite = async (req, res) => {
  const { userId } = req.body;
  try {
    await UserService.getUserById(userId)
      .then(async (user) => {
        if (user) {
          if (user.isVerified) {
            return errorResp(res, {
              msg: ERROR_MESSAGE.ALLREADY_REGISTERED,
              code: HTTP_STATUS.BAD_REQUEST.CODE,
            });
          } else {
            tokenVerificationEmail(res, EMAIL_TYPES.INVITE_USER, user);
          }
        } else {
          return errorResp(res, {
            msg: ERROR_MESSAGE.NOT_FOUND,
            code: HTTP_STATUS.NOT_FOUND.CODE,
          });
        }
      })
      .catch((error) => {
        serverError(res, error);
      });
  } catch (error) {
    serverError(res, error);
  }
};

//cancel/delete/remove user by admin and super admin
exports.disableUser = async (req, res, next) => {
  const { userId } = req.params;
  const userData = {
    status: USER_STATUS.DISABLED,
    canLogin: false,
    isVerified: false,
  };
  await UserService.updateUserById(userId, userData)
    .then(() => {
      return successResp(res, {
        msg: SUCCESS_MESSAGE.DELETED,
        code: HTTP_STATUS.SUCCESS.CODE,
        data: teamRes,
      });
    })
    .catch((error) => {
      errorResp(res, {
        msg: ERROR_MESSAGE.NOT_FOUND,
        code: HTTP_STATUS.NOT_FOUND.CODE,
      });
    });
};
