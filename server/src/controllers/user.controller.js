const UserService = require("../services/user.service");
const RoleService = require("../services/role.service");
const TeamService = require("../services/team.service");
const PlanService = require("../services/plan.service");
const BillingService = require("../services/billing.service");
const {
  convertDollerToCent,
  convertTimestampToDate,
} = require("../helpers/general_helper");
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
  TOTAL_TEAM_ADMIN,
  TOTAL_TEAM_ORGANIZER,
  PAYMENT_STATUS,
  SUBSCRIPTION_STATUS,
} = require("../lib/constants");
const { ObjectId } = require("mongodb");
const { request } = require("express");
const encryption_helper = require("../helpers/encryption_helper");

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
                members: [{ userId: result._id, roleId: role.roleId }],
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
          } else if (userRes.status == USER_STATUS.DISABLED) {
            const role = await RoleService.getRoleByRoleId(roleId);
            const inivteBy = await UserService.getUserById(user._id);
            const team = await TeamService.getTeamById(inivteBy.teamId);
            const teamInfo = getTeaminfo(team);
            if (team.members.length === TOTAL_TEAM_MEMBERS) {
              return errorResp(res, {
                msg: ERROR_MESSAGE.TEAM_LIMIT_EXCEED,
                code: HTTP_STATUS.BAD_REQUEST,
              });
            }
            if (
              roleId == ROLES.ADMIN &&
              teamInfo.totalAdmin.length === TOTAL_TEAM_ADMIN
            ) {
              return errorResp(res, {
                msg: ERROR_MESSAGE.TEAM_ADMIN_LIMIT_EXCEED,
                code: HTTP_STATUS.BAD_REQUEST,
              });
            }
            if (
              roleId == ROLES.ORGANIZER &&
              teamInfo.totalOrganizer.length === TOTAL_TEAM_ORGANIZER
            ) {
              return errorResp(res, {
                msg: ERROR_MESSAGE.TEAM_ORGANIZER_LIMIT_EXCEED,
                code: HTTP_STATUS.BAD_REQUEST,
              });
            }
            await UserService.updateUserById(userRes._id, {
              ...req.body,
              roleId: role._id,
              status: USER_STATUS.INVITE_SENT,
            })
              .then(async (result) => {
                const members = [
                  ...team.members,
                  { userId: result._id, roleId },
                ];
                await TeamService.updateTeamMembers(team._id, { members })
                  .then(async (teamRes) => {
                    await UserService.updateUserById(result._id, {
                      teamId: team._id,
                    });
                    tokenVerificationEmail(
                      res,
                      EMAIL_TYPES.INVITE_USER,
                      result,
                      user
                    );
                  })
                  .catch((error) => {
                    serverError(res, error);
                  });
              })
              .catch((error) => {
                serverError(res, error);
              });
          } else {
            return errorResp(res, {
              msg: ERROR_MESSAGE.ALLREADY_INVITED,
              code: HTTP_STATUS.BAD_REQUEST.CODE,
            });
          }
        } else {
          const role = await RoleService.getRoleByRoleId(roleId);
          const inivteBy = await UserService.getUserById(user._id);
          const team = await TeamService.getTeamById(inivteBy.teamId);
          const teamInfo = getTeaminfo(team);
          if (team.members.length === TOTAL_TEAM_MEMBERS) {
            return errorResp(res, {
              msg: ERROR_MESSAGE.TEAM_LIMIT_EXCEED,
              code: HTTP_STATUS.BAD_REQUEST,
            });
          }
          if (
            roleId == ROLES.ADMIN &&
            teamInfo.totalAdmin.length === TOTAL_TEAM_ADMIN
          ) {
            return errorResp(res, {
              msg: ERROR_MESSAGE.TEAM_ADMIN_LIMIT_EXCEED,
              code: HTTP_STATUS.BAD_REQUEST,
            });
          }
          if (
            roleId == ROLES.ORGANIZER &&
            teamInfo.totalOrganizer.length === TOTAL_TEAM_ORGANIZER
          ) {
            return errorResp(res, {
              msg: ERROR_MESSAGE.TEAM_ORGANIZER_LIMIT_EXCEED,
              code: HTTP_STATUS.BAD_REQUEST,
            });
          }
          await UserService.register({
            ...req.body,
            roleId: role._id,
            status: USER_STATUS.INVITE_SENT,
          })
            .then(async (result) => {
              const members = [...team.members, { userId: result._id, roleId }];
              await TeamService.updateTeamMembers(team._id, { members })
                .then(async (teamRes) => {
                  await UserService.updateUserById(result._id, {
                    teamId: team._id,
                  });
                  tokenVerificationEmail(
                    res,
                    EMAIL_TYPES.INVITE_USER,
                    result,
                    user
                  );
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

const getTeaminfo = (team) => {
  const totalAdmin = team.members.filter((obj) => obj.roleId === ROLES.ADMIN);
  const totalOrganizer = team.members.filter(
    (obj) => obj.roleId === ROLES.ORGANIZER
  );
  const totalParticipant = team.members.filter(
    (obj) => obj.roleId === ROLES.PARTICIPANT
  );
  return { totalAdmin, totalOrganizer, totalParticipant };
};

// generic email for register and forgot password
const tokenVerificationEmail = async (res, type, user, sender = {}) => {
  user.token = crypto_encrypt(`${Math.floor(1000 + Math.random() * 9000)}`);
  const extendExpiry = type == EMAIL_TYPES.INVITE_USER ? 24 : 1;
  const tokenExpiry = Date.now() + TOKEN_EXPIRY * extendExpiry;
  const newUser = getEmailTemplate({
    type,
    token: user.token,
    user,
    senderEmail: sender.email,
  });
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
      return {
        email: obj.user.email,
        subject: VERIFY_REGISTER_EMAIL_SUBJECT,
        html: VERIFY_REGISTER_EMAIL_TEMPLATE({
          token: crypto_decrypt(obj.token),
        }),
      };
      break;
    case EMAIL_TYPES.INVITE_USER:
      link = `${CLIENT_HOST}/auth/invite-account/${obj.token}`;
      return {
        email: obj.user.email,
        subject: INVTE_USER_EMAIL_SUBJECT,
        html: INVTE_USER_EMAIL_TEMPLATE({
          link,
          senderEmail: obj.senderEmail,
          recipientEmail: obj.user.email,
        }),
      };
      break;
    case EMAIL_TYPES.FORGOT_PASSWORD:
      link = `${CLIENT_HOST}/auth/new-password/${obj.token}`;
      return {
        email: obj.user.email,
        subject: FORGOT_PASSWORD_EMAIL_SUBJECT,
        html: FORGOT_PASSWORD_EMAIL_TEMPLATE({ link }),
      };
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
    await UserService.getUserByToken(token)
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
        if (!user.canLogin) {
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
    await UserService.getUserByToken(token)
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
    const { page, page_size } = req.query;
    const { user } = req.body;
    const role = await RoleService.getRoleById(user.roleId);
    const userData = await UserService.getUserById(user._id);
    const teamData = {
      user,
      page,
      page_size,
      roleId: role.roleId,
      teamId: userData.teamId,
    };
    const filterData = await getTeamByRole(teamData);
    await TeamService.getTeam(filterData)
      .then(async (teamRes) => {
        let docs = [];
        await Promise.all(
          teamRes.docs.map(async (team, key) => {
            await RoleService.getRoleById(team.roleId).then((role) => {
              docs[key] = { ...team._doc, role };
            });
          })
        );
        teamRes = {
          ...teamRes,
          docs,
        };
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
  try {
    const { userId } = req.params;
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
exports.cancelUserInvite = async (req, res, next) => {
  const { userId } = req.params;
  const userData = {
    status: USER_STATUS.DISABLED,
    canLogin: false,
    isVerified: false,
    token: "",
    tokenExpiry: null,
  };
  await UserService.updateUserById(userId, userData)
    .then(async (user) => {
      const team = await TeamService.getTeamById(user.teamId);
      const filterTeamMembers = team.members.filter((obj) => {
        return obj.userId.toString() !== userId;
      });
      await TeamService.updateTeamMembers(user.teamId, {
        members: filterTeamMembers,
      })
        .then((teamRes) => {
          return successResp(res, {
            msg: SUCCESS_MESSAGE.DELETED,
            code: HTTP_STATUS.SUCCESS.CODE,
          });
        })
        .catch((error) => {
          errorResp(res, {
            msg: ERROR_MESSAGE.NOT_FOUND,
            code: HTTP_STATUS.NOT_FOUND.CODE,
          });
        });
    })
    .catch((error) => {
      errorResp(res, {
        msg: ERROR_MESSAGE.NOT_FOUND,
        code: HTTP_STATUS.NOT_FOUND.CODE,
      });
    });
};

//cancel/delete/remove user by admin and super admin
exports.disableUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userData = {
      status: USER_STATUS.DISABLED,
      canLogin: false,
      isVerified: false,
      token: "",
      tokenExpiry: null,
    };
    await UserService.updateUserById(userId, userData)
      .then(async (user) => {
        const team = await TeamService.getTeamById(user.teamId);
        const filterTeamMembers = team.members.filter((obj) => {
          return obj.userId.toString() !== userId;
        });
        await TeamService.updateTeamMembers(user.teamId, {
          members: filterTeamMembers,
        }).then((teamRes) => {
          return successResp(res, {
            msg: SUCCESS_MESSAGE.DELETED,
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

// update user role
exports.updateUserRole = async (req, res, next) => {
  try {
    const { userId, roleId } = req.params;
    const { user } = req.body;
    const role = await RoleService.getRoleByRoleId(roleId);
    const inviteBy = await UserService.getUserById(user._id);
    const team = await TeamService.getTeamById(inviteBy.teamId);
    const teamInfo = getTeaminfo(team);
    if (
      roleId == ROLES.ADMIN &&
      teamInfo.totalAdmin.length === TOTAL_TEAM_ADMIN
    ) {
      return errorResp(res, {
        msg: ERROR_MESSAGE.TEAM_ADMIN_LIMIT_EXCEED,
        code: HTTP_STATUS.BAD_REQUEST,
      });
    }
    if (
      roleId == ROLES.ORGANIZER &&
      teamInfo.totalOrganizer.length === TOTAL_TEAM_ORGANIZER
    ) {
      return errorResp(res, {
        msg: ERROR_MESSAGE.TEAM_ORGANIZER_LIMIT_EXCEED,
        code: HTTP_STATUS.BAD_REQUEST,
      });
    }
    await UserService.updateUserById(userId, { roleId: role._id })
      .then(async (userRes) => {
        const memberIndex = team.members.findIndex(
          (obj) => obj.userId.toString() == userId
        );
        if (memberIndex >= 0) {
          team.members[memberIndex] = {
            userId,
            roleId: role.roleId,
          };
          await TeamService.updateTeamMembers(team._id, {
            members: team.members,
          })
            .then(async (teamRes) => {
              return successResp(res, {
                msg: SUCCESS_MESSAGE.UPDATED,
                code: HTTP_STATUS.SUCCESS.CODE,
              });
            })
            .catch((error) => {
              errorResp(res, {
                msg: ERROR_MESSAGE.NOT_FOUND,
                code: HTTP_STATUS.NOT_FOUND.CODE,
              });
            });
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

// subscribe user
exports.subscribe = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userInfo = await UserService.getUserById(userId);
    BillingService.paymentMethod(req.body)
      .then(async (paymentMethodRes) => {
        const paymentMethod = {
          paymentMethodId: paymentMethodRes.id,
          type: paymentMethodRes.type,
          brand: paymentMethodRes.card.brand,
          expMonth: paymentMethodRes.card.exp_month,
          expYear: paymentMethodRes.card.exp_year,
          last4Digits: paymentMethodRes.card.last4,
        };
        console.log(
          userInfo,
          "customer id - ",
          userInfo.stripeDetails.customerId
        );
        if (userInfo.stripeDetails.customerId) {
          console.log("in update customer");
          BillingService.updateStripeCustomer({
            request: req.body,
            paymentMethod: paymentMethodRes,
            userInfo,
          })
            .then(async (stripeCustomerRes) => {
              const reqBody = {
                stripeDetails: {
                  ...userInfo.stripeDetails,
                  paymentMethod,
                },
                autoRenew: req.body.autoRenew,
              };
              await UserService.updateUserById(userId, reqBody);
              return successResp(res, {
                msg: SUCCESS_MESSAGE.UPDATED,
                code: HTTP_STATUS.SUCCESS.CODE,
              });
              // await updateSubscription(res, userInfo, {
              //   request: req.body,
              //   paymentMethod,
              //   subscriptionId:
              //     userInfo.stripeDetails.subscription.subscriptionId,
              // });
            })
            .catch((error) => {
              errorResp(res, {
                msg: error.message,
                code: HTTP_STATUS.NOT_FOUND.CODE,
              });
            });
        } else {
          console.log("in create customer");

          BillingService.createStripeCustomer({
            request: req.body,
            paymentMethod: paymentMethodRes,
            userInfo,
          })
            .then(async (stripeCustomerRes) => {
              const reqBody = {
                stripeDetails: {
                  customerId: stripeCustomerRes.customerId,
                },
              };
              await UserService.updateUserById(userId, reqBody);
              await createSubscription(res, userInfo, {
                request: req.body,
                paymentMethod,
                customerId: stripeCustomerRes.id,
              });
            })
            .catch((error) => {
              errorResp(res, {
                msg: error.message,
                code: HTTP_STATUS.NOT_FOUND.CODE,
              });
            });
        }
      })
      .catch((error) => {
        errorResp(res, {
          msg: error.message,
          code: HTTP_STATUS.NOT_FOUND.CODE,
        });
      });
  } catch (error) {
    serverError(res, error);
  }
};

const createSubscription = async (res, userInfo, obj) => {
  console.log("in create subscription");
  try {
    const userId = userInfo._id;
    await BillingService.createSubscription(obj)
      .then(async (subscriptionRes) => {
        const subscription = {
          subscriptionId: subscriptionRes.id,
          planId: obj.request.planId,
          priceId: obj.request.priceId,
          startDate: subscriptionRes.current_period_start,
          endDate: subscriptionRes.current_period_end,
          status: subscriptionRes.status,
        };
        const role = await RoleService.getRoleById(userInfo.roleId);
        const teamData = {
          createdById: userId,
          members: [{ userId, roleId: role.roleId }],
        };
        await TeamService.createTeam(teamData)
          .then(async (teamRes) => {
            const reqBody = {
              stripeDetails: {
                paymentMethod: obj.paymentMethod,
                customerId: obj.customerId,
                subscription,
              },
              autoRenew: obj.request.autoRenew,
              status: USER_STATUS.ACTIVE,
              teamId: teamRes._id,
            };
            await UserService.updateUserById(userId, reqBody);
            return successResp(res, {
              msg: SUCCESS_MESSAGE.SUBSCRIBED,
              code: HTTP_STATUS.SUCCESS.CODE,
            });
          })
          .catch((error) => {
            serverError(res, error);
          });
      })
      .catch((error) => {
        errorResp(res, {
          msg: error.message,
          code: HTTP_STATUS.NOT_FOUND.CODE,
        });
      });
  } catch (error) {
    serverError(res, error);
  }
};

const updateSubscription = async (res, userInfo, obj) => {
  console.log("in update subscription");

  try {
    const userId = userInfo._id;
    await BillingService.updateSubscription(obj)
      .then(async (subscriptionRes) => {
        const subscription = {
          subscriptionId: subscriptionRes.id,
          planId: obj.request.planId,
          priceId: obj.request.priceId,
          startDate: subscriptionRes.current_period_start,
          endDate: subscriptionRes.current_period_end,
          status: subscriptionRes.status,
        };
        const reqBody = {
          stripeDetails: {
            paymentMethod: obj.paymentMethod,
            customerId: obj.customerId,
            subscription,
          },
          autoRenew: obj.request.autoRenew,
        };
        await UserService.updateUserById(userId, reqBody);
        return successResp(res, {
          msg: SUCCESS_MESSAGE.UPDATED,
          code: HTTP_STATUS.SUCCESS.CODE,
          data: subscriptionRes,
        });
      })
      .catch((error) => {
        errorResp(res, {
          msg: error.message,
          code: HTTP_STATUS.NOT_FOUND.CODE,
        });
      });
  } catch (error) {
    serverError(res, error);
  }
};

exports.subscriptionRecurringPayment = async (req, res, next) => {
  try {
    const { type, data } = req.body;
    const status = getPaymentStatus(type);
    console.log(status, type);
    if (status) {
      console.log("data - ", data);
      // if (type == "invoice.payment_succeeded") {
      const userInfo = await UserService.getUserByEmail(
        data.object.customer_email
      );
      const stripeDetails = {
        ...userInfo.stripeDetails,
        subscription: {
          ...userInfo.stripeDetails.subscription,
          startDate: data.object.lines.data[0].period.start,
          endDate: data.object.lines.data[0].period.end,
        },
      };
      await UserService.updateUserById(userInfo._id, { autoRenew: !data.object.cancel_period_end, stripeDetails });
      const requestBody = {
        status: getPaymentStatus(type),
        type,
        amount: convertDollerToCent(data.object.amount_paid),
        userId: userInfo._id,
        description: data.object.lines.data[0].description,
      };
      await billingHistory(requestBody);
    }
    // }
  } catch (error) {
    serverError(res, error);
  }
};

const getPaymentStatus = (type) => {
  let status;
  switch (type) {
    case "invoice.payment_succeeded":
      status = PAYMENT_STATUS.SUCCESS;
      break;
    case "invoice.payment_failed":
      status = PAYMENT_STATUS.FAILED;
      break;
    case "subscription_schedule.canceled":
      status = PAYMENT_STATUS.CANCELED;
      break;
    case "customer.subscription.trial_will_end":
      status = PAYMENT_STATUS.SUCCESS;
      break;
    default:
      status = undefined;
      break;
  }
  return status;
};

//save billing history
const billingHistory = async (obj) => {
  return await BillingService.saveBillingHistory(obj);
};

//get billing history list with pagination
exports.getBillingHistory = async (req, res, next) => {
  try {
    const { page, page_size } = req.query;
    const { user } = req.body;
    const filterData = {
      user,
      page,
      page_size,
      userId: user._id,
    };
    await BillingService.getBillingHistory(filterData)
      .then(async (billingRes) => {
        return successResp(res, {
          msg: SUCCESS_MESSAGE.DATA_FETCHED,
          code: HTTP_STATUS.SUCCESS.CODE,
          data: billingRes,
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

//get user subscription details
exports.getSubscriptionDetails = async (req, res, next) => {
  try {
    const { user } = req.body;
    await UserService.getUserById(user._id)
      .then(async (userRes) => {
        if (
          userRes.stripeDetails &&
          userRes.stripeDetails.subscription &&
          userRes.stripeDetails.subscription.planId
        ) {
          const reqBody = {
            planId: userRes.stripeDetails.subscription.planId,
            prices: [userRes.stripeDetails.subscription.priceId],
          };
          const stripePlan = await PlanService.getStripePlanById(reqBody);
          const resBody = {
            planName: stripePlan.name,
            interval: stripePlan.prices[0].recurring.interval,
            amount: convertDollerToCent(stripePlan.prices[0].unit_amount),
            nextBillingAt:
              (userRes.stripeDetails.subscription.status ==
                SUBSCRIPTION_STATUS.ACTIVE &&
                new Date(
                  convertTimestampToDate(
                    userRes.stripeDetails.subscription.endDate
                  )
                )) ||
              null,
            cancelAt:
              (userRes.stripeDetails.subscription.status ==
                SUBSCRIPTION_STATUS.CANCELED &&
                new Date(
                  convertTimestampToDate(
                    userRes.stripeDetails.subscription.canceledDate
                  )
                )) ||
              null,
            autoRenew: userRes.autoRenew,
            PaymentMethod: userRes.stripeDetails.paymentMethod,
            status: userRes.stripeDetails.subscription.status,
          };
          return successResp(res, {
            msg: SUCCESS_MESSAGE.DATA_FETCHED,
            code: HTTP_STATUS.SUCCESS.CODE,
            data: resBody,
          });
        } else {
          errorResp(res, {
            msg: ERROR_MESSAGE.NOT_FOUND,
            code: HTTP_STATUS.NOT_FOUND.CODE,
          });
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

//cancel user subscription details
exports.cancelSubscription = async (req, res, next) => {
  try {
    const { user } = req.body;
    await UserService.getUserById(user._id)
      .then(async (userRes) => {
        if (
          userRes.stripeDetails &&
          userRes.stripeDetails.subscription &&
          userRes.stripeDetails.subscription.subscriptionId
        ) {
          const cancelSubscription = await BillingService.cancelSubscription(
            userRes.stripeDetails.subscription.subscriptionId
          );
          const stripeDetails = {
            ...userRes.stripeDetails,
            subscription: {
              ...userRes.stripeDetails.subscription,
              canceledDate: cancelSubscription.cancel_at,
              status: SUBSCRIPTION_STATUS.CANCELED,
            },
          };
          await UserService.updateUserById(user._id, {
            autoRenew: false,
            stripeDetails,
          });
          return successResp(res, {
            msg: SUCCESS_MESSAGE.CANCELED,
            code: HTTP_STATUS.SUCCESS.CODE,
            data: cancelSubscription,
          });
        } else {
          errorResp(res, {
            msg: ERROR_MESSAGE.NOT_FOUND,
            code: HTTP_STATUS.NOT_FOUND.CODE,
          });
        }
      })
      .catch((error) => {
        errorResp(res, {
          msg: ERROR_MESSAGE.NOT_FOUND,
          code: HTTP_STATUS.NOT_FOUND.CODE,
        });
      });
  } catch (error) {
    console.log(error);
    serverError(res, error);
  }
};
