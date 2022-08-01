const UserService = require("../services/user.service");
const RoleService = require("../services/role.service");
const TeamService = require("../services/team.service");
const PlanService = require("../services/plan.service");
const OpportunityService = require("../services/opportunity.service");
const BillingService = require("../services/billing.service");
const {
  convertDollerToCent,
  convertTimestampToDate,
  getCurrentTimeStamp,
  convertCentToDoller,
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
  TEAM_STATUS,
  REMOVE_USER_EMAIL_SUBJECT,
  REMOVE_USER_EMAIL_TEMPLATE,
  OPPORTUNITY_STATUS,
  REMOVE_SELF_USER_EMAIL_TEMPLATE,
  REMOVE_SELF_USER_EMAIL_SUBJECT,
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
            tokenVerificationEmail(req, res, EMAIL_TYPES.VERIFY_REGISTER, user);
          }
        } else {
          await UserService.register({ ...req.body, isRegistered: true })
            .then(async (result) => {
              tokenVerificationEmail(
                req,
                res,
                EMAIL_TYPES.VERIFY_REGISTER,
                result
              );
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
          const userTeam = await TeamService.getUserSelectedTeamByTeamId(
            userRes,
            user.teamId
          );
          if (userTeam) {
            if (userTeam.status == USER_STATUS.ACTIVE) {
              return errorResp(res, {
                msg: ERROR_MESSAGE.ALLREADY_REGISTERED,
                code: HTTP_STATUS.BAD_REQUEST.CODE,
              });
            } else if (userTeam.status == USER_STATUS.DISABLED) {
              const role = await RoleService.getRoleByRoleId(roleId);
              const team = await TeamService.getTeamById(user.teamId);
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
              // if (
              //   roleId == ROLES.ORGANIZER &&
              //   teamInfo.totalOrganizer.length === TOTAL_TEAM_ORGANIZER
              // ) {
              //   return errorResp(res, {
              //     msg: ERROR_MESSAGE.TEAM_ORGANIZER_LIMIT_EXCEED,
              //     code: HTTP_STATUS.BAD_REQUEST,
              //   });
              // }
              const userTeamIndex = userRes.teams.findIndex(
                (obj) => obj.teamId.toString() == user.teamId
              );
              if (userTeamIndex >= 0) {
                userRes.teams[userTeamIndex] = {
                  teamId: userRes.teams[userTeamIndex].teamId,
                  roleId: role._id,
                  status: USER_STATUS.INVITE_SENT,
                };
                await UserService.updateUserById(userRes._id, {
                  ...req.body,
                  teams: userRes.teams,
                })
                  .then(async (result) => {
                    const members = [
                      ...team.members,
                      { userId: result._id, roleId },
                    ];
                    await TeamService.updateTeamMembers(team._id, { members })
                      .then(async (teamRes) => {
                        // await UserService.updateUserById(result._id, {
                        //   teamId: team._id,
                        // });
                        tokenVerificationEmail(
                          req,
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
                  msg: ERROR_MESSAGE.NOT_FOUND,
                  code: HTTP_STATUS.NOT_FOUND.CODE,
                });
              }
            } else {
              return errorResp(res, {
                msg: ERROR_MESSAGE.ALLREADY_INVITED(email),
                code: HTTP_STATUS.BAD_REQUEST.CODE,
              });
            }
          } else {
            const role = await RoleService.getRoleByRoleId(roleId);
            const team = await TeamService.getTeamById(user.teamId);
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
            // if (
            //   roleId == ROLES.ORGANIZER &&
            //   teamInfo.totalOrganizer.length === TOTAL_TEAM_ORGANIZER
            // ) {
            //   return errorResp(res, {
            //     msg: ERROR_MESSAGE.TEAM_ORGANIZER_LIMIT_EXCEED,
            //     code: HTTP_STATUS.BAD_REQUEST,
            //   });
            // }
            await UserService.updateUserById(userRes._id, {
              ...req.body,
              teams: [
                ...userRes.teams,
                {
                  teamId: team._id,
                  roleId: role._id,
                  status: USER_STATUS.INVITE_SENT,
                },
              ],
            })
              .then(async (result) => {
                const members = [
                  ...team.members,
                  { userId: result._id, roleId },
                ];
                await TeamService.updateTeamMembers(team._id, { members })
                  .then(async (teamRes) => {
                    // await UserService.updateUserById(result._id, {
                    //   teamId: team._id,
                    // });
                    tokenVerificationEmail(
                      req,
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
        } else {
          const role = await RoleService.getRoleByRoleId(roleId);
          const team = await TeamService.getTeamById(user.teamId);
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
          // if (
          //   roleId == ROLES.ORGANIZER &&
          //   teamInfo.totalOrganizer.length === TOTAL_TEAM_ORGANIZER
          // ) {
          //   return errorResp(res, {
          //     msg: ERROR_MESSAGE.TEAM_ORGANIZER_LIMIT_EXCEED,
          //     code: HTTP_STATUS.BAD_REQUEST,
          //   });
          // }
          await UserService.register({
            ...req.body,
            teams: [
              {
                teamId: team._id,
                roleId: role._id,
                status: USER_STATUS.INVITE_SENT,
              },
            ],
          })
            .then(async (result) => {
              const members = [...team.members, { userId: result._id, roleId }];
              await TeamService.updateTeamMembers(team._id, { members })
                .then(async (teamRes) => {
                  // await UserService.updateUserById(result._id, {
                  //   teamId: team._id,
                  // });
                  tokenVerificationEmail(
                    req,
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
        console.log(error);
        serverError(res, error);
      });
  } catch (error) {
    console.log(error);
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
const tokenVerificationEmail = async (req, res, type, user, sender = {}) => {
  user.token = crypto_encrypt(`${Math.floor(1000 + Math.random() * 9000)}`);
  const extendExpiry = type == EMAIL_TYPES.INVITE_USER ? 24 : 1;
  const tokenExpiry = Date.now() + TOKEN_EXPIRY * extendExpiry;
  const newUser = getEmailTemplate({
    loggedInUser: req.body.user,
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
            tokenVerificationEmail(req, res, EMAIL_TYPES.VERIFY_REGISTER, user);
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
  console.log(obj);
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
      link = `${CLIENT_HOST}/auth/invite-account/${obj.token}/${obj.loggedInUser.teamId}`;
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
    const { token, teamId } = req.params;
    const teamInfo = await TeamService.getTeamById(teamId);
    console.log(teamInfo);
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
          teamId,
          teamName: teamInfo.name,
          isVerified: user.isVerified,
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

// accept invite
exports.inviteRegister = async (req, res) => {
  try {
    const { userId, teamId } = req.params;
    const { firstName, lastName, newPassword } = req.body;
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
        const userTeamIndex = user.teams.findIndex(
          (obj) => obj.teamId.toString() == teamId
        );
        console.log(userTeamIndex);
        if (userTeamIndex >= 0) {
          user.teams[userTeamIndex] = {
            teamId: user.teams[userTeamIndex].teamId,
            roleId: user.teams[userTeamIndex].roleId,
            status: USER_STATUS.ACTIVE,
          };
          const userData = {
            firstName,
            lastName,
            password,
            isVerified: true,
            canLogin: true,
            teams: user.teams,
            token: "",
            tokenExpiry: null,
          };
          await UserService.updateUserById(userId, userData).then(() => {
            return successResp(res, {
              msg: SUCCESS_MESSAGE.USER_REGISTERED,
              code: HTTP_STATUS.SUCCESS.CODE,
            });
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

// join Team
exports.joinTeam = async (req, res) => {
  try {
    const { userId, teamId } = req.params;
    await UserService.getUserById(userId)
      .then(async (user) => {
        const userTeamIndex = user.teams.findIndex(
          (obj) => obj.teamId.toString() == teamId
        );
        console.log(userTeamIndex);
        if (userTeamIndex >= 0) {
          user.teams[userTeamIndex] = {
            teamId: user.teams[userTeamIndex].teamId,
            roleId: user.teams[userTeamIndex].roleId,
            status: USER_STATUS.ACTIVE,
          };
          const userData = {
            isVerified: true,
            canLogin: true,
            teams: user.teams,
            token: "",
            tokenExpiry: null,
          };
          await UserService.updateUserById(userId, userData).then(() => {
            return successResp(res, {
              msg: SUCCESS_MESSAGE.USER_REGISTERED,
              code: HTTP_STATUS.SUCCESS.CODE,
            });
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

// login user
exports.login = async (req, res) => {
  try {
    await UserService.login(req.body)
      .then(async (user) => {
        if (
          !user ||
          !user.isVerified ||
          req.body.password !== crypto_decrypt(user.password)
        ) {
          return errorResp(res, {
            msg: ERROR_MESSAGE.INVALID_CREDS,
            code: HTTP_STATUS.BAD_REQUEST.CODE,
          });
        }
        const expiry =
          (req.body.rememberMe && JWT_EXPIRY_REMEMBER_ME) || JWT_EXPIRY;
        const token = jwt.sign(
          { _id: user._id, email: user.email, rememberMe: req.body.rememberMe },
          JWT_KEY,
          {
            expiresIn: expiry,
          }
        );
        let userData = {};
        let role = {};
        if (user.isVerified) {
          if (user.isSuperAdmin) {
            const roleInfo = await RoleService.getRoleByRoleId(
              ROLES.SUPER_ADMIN
            );
            role = { roleId: roleInfo.roleId, name: roleInfo.name };
          }
          userData = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isVerified: user.isVerified,
            isSuperAdmin: user.isSuperAdmin,
            ...(user.isSuperAdmin && { role }),
            isRegistered: user.isRegistered,
            token: token,
          };
          return successResp(res, {
            msg: SUCCESS_MESSAGE.LOGIN_SUCCESS,
            code: HTTP_STATUS.SUCCESS.CODE,
            data: userData,
          });
        } else {
          tokenVerificationEmail(req, res, EMAIL_TYPES.VERIFY_REGISTER, user);
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

// login user
exports.selectTeam = async (req, res) => {
  try {
    const { user, team } = req.body;
    const userInfo = await UserService.getUserById(user._id);
    const teamInfo = TeamService.getUserSelectedTeamByTeamId(userInfo, team);
    const teamDetail = await TeamService.getTeamById(teamInfo.teamId);
    const teamOwnerDetail = await UserService.getUserById(
      teamDetail.createdById
    );
    const ownerTeamInfo = TeamService.getUserSelectedTeamByTeamId(
      teamOwnerDetail,
      team
    );
    if (
      ownerTeamInfo.stripeDetails.subscription.status ==
        SUBSCRIPTION_STATUS.CANCELED &&
      ownerTeamInfo.stripeDetails.subscription.canceledDate <
        getCurrentTimeStamp() &&
      userInfo._id.toString() !== teamOwnerDetail._id.toString()
    ) {
      return errorResp(res, {
        msg: ERROR_MESSAGE.SUBSCRIBED_CANCELED,
        code: HTTP_STATUS.BAD_REQUEST.CODE,
      });
    }

    const roleInfo = await RoleService.getRoleById(teamInfo.roleId);
    const expiry = (user.rememberMe && JWT_EXPIRY_REMEMBER_ME) || JWT_EXPIRY;
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        teamId: teamInfo.teamId,
        roleId: roleInfo._id,
        isOwner: user._id.toString() === teamDetail.createdById.toString(),
      },
      JWT_KEY,
      {
        expiresIn: expiry,
      }
    );
    let userData = {};
    console.log(user);
    if (userInfo.isVerified) {
      userData = {
        id: userInfo._id,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        role: { roleId: roleInfo.roleId, name: roleInfo.name },
        isVerified: userInfo.isVerified,
        status: teamInfo.status,
        token: token,
      };
      return successResp(res, {
        msg: SUCCESS_MESSAGE.LOGIN_SUCCESS,
        code: HTTP_STATUS.SUCCESS.CODE,
        data: userData,
      });
    } else {
      tokenVerificationEmail(req, res, EMAIL_TYPES.VERIFY_REGISTER, user);
    }
  } catch (error) {
    serverError(res, error);
  }
};

// forgot user password
exports.forgetPassword = async (req, res) => {
  try {
    await UserService.getUserByEmail(req.body.email)
      .then(async (user) => {
        if (!user && !user.isVerified) {
          return errorResp(res, {
            msg: ERROR_MESSAGE.INVALID_EMAIL,
            code: HTTP_STATUS.BAD_REQUEST.CODE,
          });
        } else {
          tokenVerificationEmail(req, res, EMAIL_TYPES.FORGOT_PASSWORD, user);
        }
      })
      .catch((error) => {
        return errorResp(res, {
          msg: ERROR_MESSAGE.INVALID_EMAIL,
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
          msg: ERROR_MESSAGE.INVALID_TOKEN,
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
    console.log(user);
    const teamDetail = await TeamService.getTeamById(user.teamId);
    const role = await RoleService.getRoleById(user.roleId);
    const teamData = {
      user,
      page,
      page_size,
      roleId: role.roleId,
      teamId: user.teamId,
      OwnerId: teamDetail.createdById,
    };
    // const filterData = await getTeamByRole(teamData);
    // console.log(filterData);
    await TeamService.getTeam(teamData)
      .then(async (teamRes) => {
        console.log(teamRes);
        let docs = [];
        await Promise.all(
          teamRes.docs.map(async (userObj, key) => {
            const teamInfo = TeamService.getUserSelectedTeamByTeamId(
              userObj,
              user.teamId
            );
            // if (teamInfo.status !== USER_STATUS.DISABLED) {
            await RoleService.getRoleById(teamInfo.roleId).then(
              async (role) => {
                const teamData = await TeamService.getTeamById(teamInfo.teamId);
                delete userObj._doc.teams;
                docs[key] = {
                  ...userObj._doc,
                  isOwner:
                    userObj._doc._id.toString() ===
                    teamData.createdById.toString(),
                  role: {
                    _id: role._id,
                    roleId: role.roleId,
                    name: role.name,
                  },
                  teamId: teamInfo.teamId,
                  status: teamInfo.status,
                };
              }
            );
            // }
          })
        );
        // !user.isOwner && (docs = docs.filter((obj) => !obj.isOwner))

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
        console.log(error);
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

exports.getUserTeams = async (req, res, next) => {
  try {
    const { user } = req.body;
    const userId = user._id;
    await UserService.getUserById(userId)
      .then(async (userInfo) => {
        let teamsList = [];
        await Promise.all(
          userInfo.teams.map(async (team, key) => {
            if (team.status !== USER_STATUS.DISABLED) {
              const teamData = await TeamService.getTeamById(team.teamId);
              const member = teamData.members.find(
                (member) => member.userId.toString() === userId
              );
              teamsList.push({
                teamId: team.teamId,
                status: team.status,
                name: teamData.name,
                roleId: member.roleId,
                totalMembers: teamData.members.length,
              });
            }
          })
        );
        const activeTeamList = teamsList.filter(
          (team) => team.status == USER_STATUS.ACTIVE
        );
        const invitedTeamList = teamsList.filter(
          (team) => team.status == USER_STATUS.INVITE_SENT
        );
        return successResp(res, {
          msg: SUCCESS_MESSAGE.DATA_FETCHED,
          code: HTTP_STATUS.SUCCESS.CODE,
          data: { activeTeamList, invitedTeamList },
        });
      })
      .catch((error) => {
        console.log(error);
        errorResp(res, {
          code: HTTP_STATUS.NOT_FOUND.CODE,
          msg: ERROR_MESSAGE.NOT_FOUND,
        });
      });
  } catch (error) {
    console.log(error);
    serverError(res, error);
  }
};

// get team according to the user role
const getTeamByRole = async (obj) => {
  let roles;
  let roleIds = [];
  if (obj.roleId !== ROLES.ADMIN) {
    roles = await RoleService.getRolesByRoleIds([
      ROLES.ADMIN,
      ROLES.SUPER_ADMIN,
    ]);
    roles.map((role) => {
      roleIds.push(role._id);
    });
  } else {
    roles = await RoleService.getRolesByRoleIds([ROLES.SUPER_ADMIN]);
    roles.map((role) => {
      roleIds.push(role._id.toString());
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
    const { user } = req.body;
    await UserService.getUserById(userId)
      .then(async (userRes) => {
        if (userRes) {
          const userTeam = await TeamService.getUserSelectedTeamByTeamId(
            userRes,
            user.teamId
          );
          console.log(userTeam);
          if (userTeam.status == USER_STATUS.ACTIVE) {
            return errorResp(res, {
              msg: ERROR_MESSAGE.ALLREADY_REGISTERED,
              code: HTTP_STATUS.BAD_REQUEST.CODE,
            });
          } else {
            tokenVerificationEmail(req, res, EMAIL_TYPES.INVITE_USER, userRes);
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
  try {
    const { userId } = req.params;
    const { user } = req.body;
    const userInfo = await UserService.getUserById(userId);
    const userTeamIndex = userInfo.teams.findIndex(
      (obj) => obj.teamId.toString() == user.teamId
    );
    if (userTeamIndex >= 0) {
      userInfo.teams[userTeamIndex] = {
        teamId: userInfo.teams[userTeamIndex].teamId,
        roleId: userInfo.teams[userTeamIndex].roleId,
        status: USER_STATUS.DISABLED,
      };
      const userData = {
        teams: userInfo.teams,
        // canLogin: false,
        // isVerified: false,
        // token: "",
        // tokenExpiry: null,
      };
      await UserService.updateUserById(userId, userData)
        .then(async (userRes) => {
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
          console.log(error);
          errorResp(res, {
            msg: ERROR_MESSAGE.NOT_FOUND,
            code: HTTP_STATUS.NOT_FOUND.CODE,
          });
        });
    } else {
      console.log(error);
      return errorResp(res, {
        msg: ERROR_MESSAGE.NOT_FOUND,
        code: HTTP_STATUS.NOT_FOUND.CODE,
      });
    }
  } catch (error) {
    console.log(error);
    serverError(res, error);
  }
};

//cancel/delete/remove user by admin and super admin
exports.disableUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { user } = req.body;
    const userInfo = await UserService.getUserById(userId);
    const userTeamIndex = userInfo.teams.findIndex(
      (obj) => obj.teamId.toString() == user.teamId
    );
    console.log(userTeamIndex);
    if (userTeamIndex >= 0) {
      userInfo.teams[userTeamIndex] = {
        teamId: userInfo.teams[userTeamIndex].teamId,
        roleId: userInfo.teams[userTeamIndex].roleId,
        status: USER_STATUS.DISABLED,
      };
      const userData = {
        teams: userInfo.teams,
        // canLogin: false,
        // isVerified: false,
        // token: "",
        // tokenExpiry: null,
      };
      await UserService.updateUserById(userId, userData)
        .then(async (userRes) => {
          const team = await TeamService.getTeamById(user.teamId);
          const filterTeamMembers = team.members.filter((obj) => {
            return obj.userId.toString() !== userId;
          });
          await TeamService.updateTeamMembers(user.teamId, {
            members: filterTeamMembers,
          }).then(async (teamRes) => {
            const userOpportunites =
              await OpportunityService.getOpportunitiesByUserAsParticipant({
                _id: userInfo._id,
                teamId: user.teamId,
              });
            if (userOpportunites && userOpportunites.length) {
              userOpportunites.map((opp) => {
                const filteredParticipants =
                  opp.participants.filter(
                    (part) => part.toString() !== userId.toString()
                  );
                OpportunityService.updateOpportunity(opp._id, {
                  participants: filteredParticipants,
                });
              });
            }
            const emailObj = {
              email: userInfo.email,
              subject: REMOVE_USER_EMAIL_SUBJECT,
              html: REMOVE_USER_EMAIL_TEMPLATE({
                teamName: team.name,
                removedBy: user.email,
              })
            };
            await UserService.tokenVerificationEmail(emailObj)
              .then((emailRes) => {
                return successResp(res, {
                  msg: SUCCESS_MESSAGE.DELETED,
                  code: HTTP_STATUS.SUCCESS.CODE,
                });
              })
              .catch((error) => {
                console.log(error);
                errorResp(res, {
                  msg: ERROR_MESSAGE.NOT_FOUND,
                  code: HTTP_STATUS.NOT_FOUND.CODE,
                });
              });
          });
        })
        .catch((error) => {
          console.log(error);
          errorResp(res, {
            msg: ERROR_MESSAGE.NOT_FOUND,
            code: HTTP_STATUS.NOT_FOUND.CODE,
          });
        });
    } else {
      console.log(error);
      return errorResp(res, {
        msg: ERROR_MESSAGE.NOT_FOUND,
        code: HTTP_STATUS.NOT_FOUND.CODE,
      });
    }
  } catch (error) {
    serverError(res, error);
  }
};

//delete my account

exports.disableMyAccount = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { user } = req.body;
    const userInfo = await UserService.getUserById(userId);
      const userData = {
        canLogin: false,
        isVerified: false
      };
      await UserService.updateUserById(userId, userData)
        .then(async (userRes) => {
          const emailObj = {
            email: userInfo.email,
            subject: REMOVE_SELF_USER_EMAIL_SUBJECT,
            html: REMOVE_SELF_USER_EMAIL_TEMPLATE()
          };
          await UserService.tokenVerificationEmail(emailObj)
            .then((emailRes) => {
              return successResp(res, {
                msg: SUCCESS_MESSAGE.DELETED,
                code: HTTP_STATUS.SUCCESS.CODE,
              });
            })
            .catch((error) => {
              console.log(error);
              errorResp(res, {
                msg: ERROR_MESSAGE.NOT_FOUND,
                code: HTTP_STATUS.NOT_FOUND.CODE,
              });
            });
        })
        .catch((error) => {
          console.log(error);
          errorResp(res, {
            msg: ERROR_MESSAGE.NOT_FOUND,
            code: HTTP_STATUS.NOT_FOUND.CODE,
          });
        });
  } catch (error) {
    serverError(res, error);
  }
};

exports.disableUserBySelf = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { user } = req.body;
    const userInfo = await UserService.getUserById(userId);
    await userInfo.teams.map(async (teamObj, userTeamIndex) => {
    if (userTeamIndex >= 0) {
      userInfo.teams[userTeamIndex] = {
        teamId: userInfo.teams[userTeamIndex].teamId,
        roleId: userInfo.teams[userTeamIndex].roleId,
        status: USER_STATUS.DISABLED,
      };
      const userData = {
        teams: userInfo.teams,
        canLogin: false,
        isVerified: false
      };
      await UserService.updateUserById(userId, userData)
        .then(async (userRes) => {
          const team = await TeamService.getTeamById(teamObj._id);
          const filterTeamMembers = team.members.filter((obj) => {
            return obj.userId.toString() !== userId;
          });
          await TeamService.updateTeamMembers(teamObj._id, {
            members: filterTeamMembers,
          }).then(async (teamRes) => {
            const userOpportunites =
              await OpportunityService.getOpportunitiesByUserAsParticipant({
                _id: userInfo._id,
                teamId: teamObj._id,
                status: OPPORTUNITY_STATUS.DRAFT
              });
            if (userOpportunites && userOpportunites.length) {
              userOpportunites.map((opp) => {
                const filteredParticipants =
                  opp.participants.filter(
                    (part) => part.toString() !== userId.toString()
                  );
                OpportunityService.updateOpportunity(opp._id, {
                  participants: filteredParticipants,
                });
              });
            }
          });
        })
        .catch((error) => {
          console.log(error);
          errorResp(res, {
            msg: ERROR_MESSAGE.NOT_FOUND,
            code: HTTP_STATUS.NOT_FOUND.CODE,
          });
        });
    } else {
      console.log(error);
      return errorResp(res, {
        msg: ERROR_MESSAGE.NOT_FOUND,
        code: HTTP_STATUS.NOT_FOUND.CODE,
      });
    }
  })
  } catch (error) {
    serverError(res, error);
  }
};

// update user role
exports.updateUserRole = async (req, res, next) => {
  try {
    const { userId, roleId } = req.params;
    const { user } = req.body;
    const userInfo = await UserService.getUserById(userId);
    const role = await RoleService.getRoleByRoleId(roleId);
    const team = await TeamService.getTeamById(user.teamId);
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
    // if (
    //   roleId == ROLES.ORGANIZER &&
    //   teamInfo.totalOrganizer.length === TOTAL_TEAM_ORGANIZER
    // ) {
    //   return errorResp(res, {
    //     msg: ERROR_MESSAGE.TEAM_ORGANIZER_LIMIT_EXCEED,
    //     code: HTTP_STATUS.BAD_REQUEST,
    //   });
    // }
    const userTeamIndex = userInfo.teams.findIndex(
      (obj) => obj.teamId.toString() == user.teamId
    );
    if (userTeamIndex >= 0) {
      userInfo.teams[userTeamIndex] = {
        teamId: userInfo.teams[userTeamIndex].teamId,
        status: userInfo.teams[userTeamIndex].status,
        roleId: role._id,
      };
      // console.log(userInfo.teams);return;
      await UserService.updateUserById(userId, { teams: userInfo.teams });
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
        });
        return successResp(res, {
          msg: SUCCESS_MESSAGE.UPDATED,
          code: HTTP_STATUS.SUCCESS.CODE,
        });
      } else {
        errorResp(res, {
          msg: ERROR_MESSAGE.NOT_FOUND,
          code: HTTP_STATUS.NOT_FOUND.CODE,
        });
      }
    } else {
      errorResp(res, {
        msg: ERROR_MESSAGE.NOT_FOUND,
        code: HTTP_STATUS.NOT_FOUND.CODE,
      });
    }
  } catch (error) {
    console.log(error);
    serverError(res, error);
  }
};

//coupon details
exports.applyCoupon = async (req, res, next) => {
  try {
    const { couponCode } = req.params;
    await BillingService.couponDetails(couponCode)
      .then((couponRes) => {
        couponRes = {
          currency: couponRes.currency,
          duration: couponRes.duration,
          valid: couponRes.valid,
          name: couponRes.name,
          times_redeemed: couponRes.times_redeemed,
          percent_off: couponRes.percent_off,
          amount_off: convertDollerToCent(couponRes.amount_off),
        };
        return successResp(res, {
          msg: SUCCESS_MESSAGE.DATA_FETCHED,
          code: HTTP_STATUS.SUCCESS.CODE,
          data: couponRes,
        });
      })
      .catch((error) => {
        errorResp(res, {
          msg: error.message,
          code: HTTP_STATUS.NOT_FOUND.CODE,
        });
      });
  } catch (error) {
    console.log(error);
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
        console.log(userInfo, "customer id - ", userInfo.customerId);
        if (userInfo.customerId) {
          console.log("in update customer");
          BillingService.updateStripeCustomer({
            request: req.body,
            paymentMethod: paymentMethodRes,
            userInfo,
          })
            .then(async (stripeCustomerRes) => {
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
        } else {
          console.log("in create customer");

          BillingService.createStripeCustomer({
            request: req.body,
            paymentMethod: paymentMethodRes,
            userInfo,
          })
            .then(async (stripeCustomerRes) => {
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

// change payment method
exports.changePaymentMethod = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { user } = req.body;
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
        console.log(userInfo, "customer id - ", userInfo.customerId);
        if (userInfo.customerId) {
          console.log("in update customer");
          BillingService.updateStripeCustomer({
            request: req.body,
            paymentMethod: paymentMethodRes,
            userInfo,
          })
            .then(async (stripeCustomerRes) => {
              const teamInfo = await TeamService.getUserSelectedTeamByTeamId(
                userInfo,
                user.teamId
              );
              await updateSubscription(res, userInfo, {
                request: req.body,
                paymentMethod,
                customerId: stripeCustomerRes.id,
                subscriptionId:
                  teamInfo.stripeDetails.subscription.subscriptionId,
              });
            })
            .catch((error) => {
              errorResp(res, {
                msg: error.message,
                code: HTTP_STATUS.NOT_FOUND.CODE,
              });
            });
        } else {
          return errorResp(res, {
            msg: error.message,
            code: HTTP_STATUS.NOT_FOUND.CODE,
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

// add payment method
exports.addPaymentMethod = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { user } = req.body;
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
        console.log(userInfo, "customer id - ", userInfo.customerId);
        if (!userInfo.customerId) {
          console.log("in update customer");
          BillingService.createStripeCustomer({
            request: req.body,
            paymentMethod: paymentMethodRes,
            userInfo,
          })
            .then(async (stripeCustomerRes) => {
              const teamInfo = await TeamService.getUserSelectedTeamByTeamId(
                userInfo,
                user.teamId
              );
              const reqBody = {
                priceId: teamInfo.stripeDetails.subscription.priceId,
                autoRenew: req.body.autoRenew,
              };
              await BillingService.createSubscription({
                request: reqBody,
                customerId: stripeCustomerRes.id,
              })
                .then(async (subscriptionRes) => {
                  console.log(subscriptionRes);
                  const subscription = {
                    subscriptionId: subscriptionRes.id,
                    planId: teamInfo.stripeDetails.subscription.planId,
                    priceId: teamInfo.stripeDetails.subscription.priceId,
                    startDate: subscriptionRes.current_period_start,
                    endDate: subscriptionRes.current_period_end,
                    canceledDate: subscriptionRes.cancel_at,
                    status:
                      (subscriptionRes.cancel_at &&
                        SUBSCRIPTION_STATUS.CANCELED) ||
                      subscriptionRes.status,
                    autoRenew: req.body.autoRenew,
                  };
                  const userTeamIndex = userInfo.teams.findIndex(
                    (team) => team.teamId.toString() == user.teamId
                  );
                  if (userTeamIndex >= 0) {
                    const stripeDetails = {
                      ...teamInfo.stripeDetails,
                      paymentMethod,
                      subscription,
                    };
                    console.log(subscription, stripeDetails, "---");
                    userInfo.teams[userTeamIndex] = {
                      teamId: userInfo.teams[userTeamIndex].teamId,
                      status: userInfo.teams[userTeamIndex].status,
                      roleId: userInfo.teams[userTeamIndex].roleId,
                      stripeDetails,
                    };
                    await UserService.updateUserById(userId, {
                      teams: userInfo.teams,
                    });
                    return successResp(res, {
                      msg: SUCCESS_MESSAGE.SUBSCRIBED,
                      code: HTTP_STATUS.SUCCESS.CODE,
                    });
                  } else {
                    errorResp(res, {
                      msg: error.message,
                      code: HTTP_STATUS.NOT_FOUND.CODE,
                    });
                  }
                })
                .catch((error) => {
                  errorResp(res, {
                    msg: error.message,
                    code: HTTP_STATUS.NOT_FOUND.CODE,
                  });
                });
            })
            .catch((error) => {
              errorResp(res, {
                msg: error.message,
                code: HTTP_STATUS.NOT_FOUND.CODE,
              });
            });
        } else {
          BillingService.updateStripeCustomer({
            request: req.body,
            paymentMethod: paymentMethodRes,
            userInfo,
          })
            .then(async (stripeCustomerRes) => {
              const teamInfo = await TeamService.getUserSelectedTeamByTeamId(
                userInfo,
                user.teamId
              );
              const reqBody = {
                priceId: teamInfo.stripeDetails.subscription.priceId,
                autoRenew: req.body.autoRenew,
              };
              await BillingService.createSubscription({
                request: reqBody,
                customerId: stripeCustomerRes.id,
              })
                .then(async (subscriptionRes) => {
                  console.log(subscriptionRes);
                  const subscription = {
                    subscriptionId: subscriptionRes.id,
                    planId: teamInfo.stripeDetails.subscription.planId,
                    priceId: teamInfo.stripeDetails.subscription.priceId,
                    startDate: subscriptionRes.current_period_start,
                    endDate: subscriptionRes.current_period_end,
                    canceledDate: subscriptionRes.cancel_at,
                    status:
                      (subscriptionRes.cancel_at &&
                        SUBSCRIPTION_STATUS.CANCELED) ||
                      subscriptionRes.status,
                    autoRenew: req.body.autoRenew,
                  };
                  const userTeamIndex = userInfo.teams.findIndex(
                    (team) => team.teamId.toString() == user.teamId
                  );
                  if (userTeamIndex >= 0) {
                    const stripeDetails = {
                      ...teamInfo.stripeDetails,
                      paymentMethod,
                      subscription,
                    };
                    console.log(subscription, stripeDetails, "---");
                    userInfo.teams[userTeamIndex] = {
                      teamId: userInfo.teams[userTeamIndex].teamId,
                      status: userInfo.teams[userTeamIndex].status,
                      roleId: userInfo.teams[userTeamIndex].roleId,
                      stripeDetails,
                    };
                    await UserService.updateUserById(userId, {
                      teams: userInfo.teams,
                    });
                    return successResp(res, {
                      msg: SUCCESS_MESSAGE.SUBSCRIBED,
                      code: HTTP_STATUS.SUCCESS.CODE,
                    });
                  } else {
                    errorResp(res, {
                      msg: error.message,
                      code: HTTP_STATUS.NOT_FOUND.CODE,
                    });
                  }
                })
                .catch((error) => {
                  errorResp(res, {
                    msg: error.message,
                    code: HTTP_STATUS.NOT_FOUND.CODE,
                  });
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

// renew user subscription
exports.renewSubscription = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { user } = req.body;
    const userInfo = await UserService.getUserById(userId);
    const teamInfo = await TeamService.getUserSelectedTeamByTeamId(
      userInfo,
      user.teamId
    );
    console.log(teamInfo);
    if (
      teamInfo.stripeDetails.subscription.status == SUBSCRIPTION_STATUS.ACTIVE
    ) {
      return errorResp(res, {
        msg: ERROR_MESSAGE.SUBSCRIBED,
        code: HTTP_STATUS.BAD_REQUEST.CODE,
      });
    }
    const reqBody = {
      priceId: teamInfo.stripeDetails.subscription.priceId,
      autoRenew: teamInfo.stripeDetails.subscription.autoRenew,
    };
    await BillingService.createSubscription({
      request: reqBody,
      customerId: userInfo.customerId,
    })
      .then(async (subscriptionRes) => {
        console.log(subscriptionRes);
        const subscription = {
          subscriptionId: subscriptionRes.id,
          planId: teamInfo.stripeDetails.subscription.planId,
          priceId: teamInfo.stripeDetails.subscription.priceId,
          startDate: subscriptionRes.current_period_start,
          endDate: subscriptionRes.current_period_end,
          canceledDate: subscriptionRes.cancel_at,
          status:
            (subscriptionRes.cancel_at && SUBSCRIPTION_STATUS.CANCELED) ||
            subscriptionRes.status,
          autoRenew: teamInfo.stripeDetails.subscription.autoRenew,
        };
        const userTeamIndex = userInfo.teams.findIndex(
          (team) => team.teamId.toString() == user.teamId
        );
        if (userTeamIndex >= 0) {
          const stripeDetails = {
            ...teamInfo.stripeDetails,
            subscription,
          };
          console.log(subscription, stripeDetails, "---");
          userInfo.teams[userTeamIndex] = {
            teamId: userInfo.teams[userTeamIndex].teamId,
            status: userInfo.teams[userTeamIndex].status,
            roleId: userInfo.teams[userTeamIndex].roleId,
            stripeDetails,
          };
          await UserService.updateUserById(userId, { teams: userInfo.teams });
          return successResp(res, {
            msg: SUCCESS_MESSAGE.SUBSCRIBED,
            code: HTTP_STATUS.SUCCESS.CODE,
          });
        } else {
          errorResp(res, {
            msg: error.message,
            code: HTTP_STATUS.NOT_FOUND.CODE,
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
          canceledDate: subscriptionRes.cancel_at,
          status:
            (subscriptionRes.cancel_at && SUBSCRIPTION_STATUS.CANCELED) ||
            subscriptionRes.status,
          autoRenew: obj.request.autoRenew,
        };
        const role = await RoleService.getRoleByRoleId(ROLES.ADMIN);
        const teamData = {
          name: obj.request.teamName,
          createdById: userId,
          members: [{ userId, roleId: role.roleId }],
        };
        await TeamService.createTeam(teamData)
          .then(async (teamRes) => {
            const reqBody = {
              customerId: obj.customerId,
              isRegistered: false,
              teams: [
                ...userInfo.teams,
                {
                  teamId: teamRes._id,
                  roleId: role._id,
                  status: USER_STATUS.ACTIVE,
                  stripeDetails: {
                    paymentMethod: obj.paymentMethod,
                    subscription,
                  },
                },
              ],
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
        const teamInfo = await TeamService.getUserSelectedTeamByTeamId(
          userInfo,
          obj.request.user.teamId
        );
        const subscription = {
          ...teamInfo.stripeDetails.subscription,
          canceledDate: subscriptionRes.cancel_at,
          status:
            (subscriptionRes.cancel_at && SUBSCRIPTION_STATUS.CANCELED) ||
            subscriptionRes.status,
          autoRenew: obj.request.autoRenew,
        };
        const userTeamIndex = userInfo.teams.findIndex(
          (team) => team.teamId.toString() == obj.request.user.teamId
        );
        if (userTeamIndex >= 0) {
          const stripeDetails = {
            paymentMethod: obj.paymentMethod,
            subscription,
          };
          console.log(stripeDetails, "--");
          userInfo.teams[userTeamIndex] = {
            teamId: userInfo.teams[userTeamIndex].teamId,
            status: userInfo.teams[userTeamIndex].status,
            roleId: userInfo.teams[userTeamIndex].roleId,
            stripeDetails,
          };
          await UserService.updateUserById(userId, { teams: userInfo.teams });
          return successResp(res, {
            msg: SUCCESS_MESSAGE.UPDATED,
            code: HTTP_STATUS.SUCCESS.CODE,
          });
        } else {
          return errorResp(res, {
            msg: error.message,
            code: HTTP_STATUS.NOT_FOUND.CODE,
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
      const teamSubscription = userInfo.teams.find(
        (team) =>
          team.stripeDetails.subscription.subscriptionId ===
          data.object.subscription
      );
      if (teamSubscription) {
        const stripeDetails = {
          ...teamSubscription.stripeDetails,
          subscription: {
            ...teamSubscription.stripeDetails.subscription,
            startDate: data.object.lines.data[0].period.start,
            endDate: data.object.lines.data[0].period.end,
            autoRenew: !data.object.cancel_period_end,
          },
        };
        const userTeamIndex = userInfo.teams.findIndex(
          (team) => team.teamId.toString() == teamSubscription.teamId
        );
        if (userTeamIndex >= 0) {
          userInfo.teams[userTeamIndex] = {
            teamId: userInfo.teams[userTeamIndex].teamId,
            status: userInfo.teams[userTeamIndex].status,
            roleId: userInfo.teams[userTeamIndex].roleId,
            stripeDetails,
          };
          await UserService.updateUserById(userInfo._id, {
            teams: userInfo.teams,
          });
          const requestBody = {
            status: getPaymentStatus(type),
            type,
            amount: convertDollerToCent(data.object.amount_paid),
            userId: userInfo._id,
            teamId: teamSubscription.teamId,
            description: data.object.lines.data[0].description,
          };
          await billingHistory(requestBody);
          return successResp(res, {
            msg: SUCCESS_MESSAGE.UPDATED,
            code: HTTP_STATUS.SUCCESS.CODE,
          });
        } else {
          errorResp(res, {
            msg: error.message,
            code: HTTP_STATUS.NOT_FOUND.CODE,
          });
        }
      } else {
        errorResp(res, {
          msg: ERROR_MESSAGE.NOT_FOUND,
          code: HTTP_STATUS.NOT_FOUND.CODE,
        });
      }
    }
    // }
  } catch (error) {
    console.log(error);
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
      teamId: user.teamId,
    };
    console.log(filterData);
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
        const teamInfo = await TeamService.getUserSelectedTeamByTeamId(
          userRes,
          user.teamId
        );
        console.log(teamInfo);
        if (
          teamInfo.stripeDetails &&
          teamInfo.stripeDetails.subscription &&
          teamInfo.stripeDetails.subscription.planId
        ) {
          const reqBody = {
            planId: teamInfo.stripeDetails.subscription.planId,
            prices: [teamInfo.stripeDetails.subscription.priceId],
          };
          const stripePlan = await PlanService.getStripePlanById(reqBody);
          const resBody = {
            planName: stripePlan.name,
            interval: stripePlan.prices[0].recurring.interval,
            amount: convertDollerToCent(stripePlan.prices[0].unit_amount),
            nextBillingAt:
              (teamInfo.stripeDetails.subscription.status ==
                SUBSCRIPTION_STATUS.ACTIVE &&
                new Date(
                  convertTimestampToDate(
                    teamInfo.stripeDetails.subscription.endDate
                  )
                )) ||
              null,
            cancelAt:
              (teamInfo.stripeDetails.subscription.status ==
                SUBSCRIPTION_STATUS.CANCELED &&
                new Date(
                  convertTimestampToDate(
                    teamInfo.stripeDetails.subscription.canceledDate
                  )
                )) ||
              null,
            autoRenew: teamInfo.stripeDetails.subscription.autoRenew,
            hasPaymentMethod:
              (teamInfo.stripeDetails.paymentMethod.paymentMethodId && true) ||
              false,
            PaymentMethod: teamInfo.stripeDetails.paymentMethod,
            status: teamInfo.stripeDetails.subscription.status,
            isExpired:
              (teamInfo.stripeDetails.subscription.status ==
                SUBSCRIPTION_STATUS.CANCELED &&
                teamInfo.stripeDetails.subscription.canceledDate <
                  getCurrentTimeStamp()) ||
              false,
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
        console.log(userRes, user.teamId);
        const teamInfo = await TeamService.getUserSelectedTeamByTeamId(
          userRes,
          user.teamId
        );
        console.log(teamInfo);
        if (
          teamInfo.stripeDetails &&
          teamInfo.stripeDetails.subscription &&
          teamInfo.stripeDetails.subscription.subscriptionId
        ) {
          const cancelSubscription =
            await BillingService.cancelResumeSubscription(
              teamInfo.stripeDetails.subscription.subscriptionId,
              true
            );
          const stripeDetails = {
            ...teamInfo.stripeDetails,
            subscription: {
              ...teamInfo.stripeDetails.subscription,
              canceledDate: cancelSubscription.cancel_at,
              status: SUBSCRIPTION_STATUS.CANCELED,
              autoRenew: false,
            },
          };
          const userTeamIndex = userRes.teams.findIndex(
            (team) => team.teamId.toString() == teamInfo.teamId
          );
          if (userTeamIndex >= 0) {
            userRes.teams[userTeamIndex] = {
              teamId: userRes.teams[userTeamIndex].teamId,
              status: userRes.teams[userTeamIndex].status,
              roleId: userRes.teams[userTeamIndex].roleId,
              stripeDetails,
            };
            await UserService.updateUserById(user._id, {
              teams: userRes.teams,
            });
            return successResp(res, {
              msg: SUCCESS_MESSAGE.CANCELED,
              code: HTTP_STATUS.SUCCESS.CODE,
            });
          } else {
            errorResp(res, {
              msg: ERROR_MESSAGE.NOT_FOUND,
              code: HTTP_STATUS.NOT_FOUND.CODE,
            });
          }
        } else {
          errorResp(res, {
            msg: ERROR_MESSAGE.NOT_FOUND,
            code: HTTP_STATUS.NOT_FOUND.CODE,
          });
        }
      })
      .catch((error) => {
        console.log(error);
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

//resume user subscription details
exports.resumeSubscription = async (req, res, next) => {
  try {
    const { user } = req.body;
    await UserService.getUserById(user._id)
      .then(async (userRes) => {
        const teamInfo = await TeamService.getUserSelectedTeamByTeamId(
          userRes,
          user.teamId
        );
        if (
          teamInfo.stripeDetails &&
          teamInfo.stripeDetails.subscription &&
          teamInfo.stripeDetails.subscription.subscriptionId
        ) {
          const renewSubscription =
            await BillingService.cancelResumeSubscription(
              teamInfo.stripeDetails.subscription.subscriptionId,
              false
            );
          const stripeDetails = {
            ...teamInfo.stripeDetails,
            subscription: {
              ...teamInfo.stripeDetails.subscription,
              canceledDate: renewSubscription.cancel_at,
              status: SUBSCRIPTION_STATUS.ACTIVE,
              autoRenew: true,
            },
          };
          const userTeamIndex = userRes.teams.findIndex(
            (team) => team.teamId.toString() == teamInfo.teamId
          );
          if (userTeamIndex >= 0) {
            userRes.teams[userTeamIndex] = {
              teamId: userRes.teams[userTeamIndex].teamId,
              status: userRes.teams[userTeamIndex].status,
              roleId: userRes.teams[userTeamIndex].roleId,
              stripeDetails,
            };
            await UserService.updateUserById(user._id, {
              teams: userRes.teams,
            });
            return successResp(res, {
              msg: SUCCESS_MESSAGE.UPDATED,
              code: HTTP_STATUS.SUCCESS.CODE,
            });
          } else {
            errorResp(res, {
              msg: ERROR_MESSAGE.NOT_FOUND,
              code: HTTP_STATUS.NOT_FOUND.CODE,
            });
          }
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

exports.getTeamAdmins = async (req, res, next) => {
  try {
    const { user } = req.body;
    await TeamService.getUsersByTeamIdRoleId(user)
      .then((userRes) => {
        console.log(userRes);
        return successResp(res, {
          msg: SUCCESS_MESSAGE.DATA_FETCHED,
          code: HTTP_STATUS.SUCCESS.CODE,
          data: userRes,
        });
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

exports.getTeamMembers = async (req, res, next) => {
  try {
    const { user } = req.body;
    await TeamService.getTeamMembers(user)
      .then((userRes) => {
        console.log(userRes);
        return successResp(res, {
          msg: SUCCESS_MESSAGE.DATA_FETCHED,
          code: HTTP_STATUS.SUCCESS.CODE,
          data: userRes,
        });
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

const usersByTeam = async (teamId) => {
  return await TeamService.getUsersByTeamId(teamId);
};

exports.deleteTeam = async (req, res, next) => {
  try {
    const { user } = req.body;
    const teamUsers = await usersByTeam(user.teamId);
    Promise.all(
      teamUsers.map(async (userInfo) => {
        const userTeamIndex = userInfo.teams.findIndex(
          (obj) => obj.teamId.toString() == user.teamId
        );
        console.log(userTeamIndex);
        if (userTeamIndex >= 0) {
          userInfo.teams[userTeamIndex] = {
            teamId: userInfo.teams[userTeamIndex].teamId,
            roleId: userInfo.teams[userTeamIndex].roleId,
            status: USER_STATUS.DISABLED,
          };
          const userData = {
            teams: userInfo.teams,
          };
          await UserService.updateUserById(userInfo._id, userData);
        }
      })
    );
    const teamRes = await TeamService.updateTeamMembers(user.teamId, {
      members: [],
      status: TEAM_STATUS.DISABLED,
    });
    return successResp(res, {
      msg: SUCCESS_MESSAGE.DELETED,
      code: HTTP_STATUS.SUCCESS.CODE,
    });
  } catch (error) {
    console.log(error);
    serverError(res, error);
  }
};

exports.transferTeamOwnerShip = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { user } = req.body;

    // current owner
    const userInfo = await UserService.getUserById(user._id);
    const userTeam = await TeamService.getUserSelectedTeamByTeamId(
      userInfo,
      user.teamId
    );
    if (userTeam.status === USER_STATUS.DISABLED) {
      return errorResp(res, {
        msg: ERROR_MESSAGE.NOT_FOUND,
        code: HTTP_STATUS.NOT_FOUND.CODE,
      });
    }
    const cancelSubscription = await BillingService.cancelResumeSubscription(
      userTeam.stripeDetails.subscription.subscriptionId,
      true
    );
    const stripeDetails = {
      ...userTeam.stripeDetails,
      subscription: {
        ...userTeam.stripeDetails.subscription,
        canceledDate: cancelSubscription.cancel_at,
        status: SUBSCRIPTION_STATUS.CANCELED,
        autoRenew: false,
      },
      paymentMethod: {},
    };

    //new owner
    const newUserInfo = await UserService.getUserById(userId);
    const newUserTeamIndex = newUserInfo.teams.findIndex(
      (obj) => obj.teamId.toString() == user.teamId
    );
    if (newUserTeamIndex >= 0) {
      newUserInfo.teams[newUserTeamIndex] = {
        teamId: newUserInfo.teams[newUserTeamIndex].teamId,
        roleId: newUserInfo.teams[newUserTeamIndex].roleId,
        status: USER_STATUS.ACTIVE,
        stripeDetails,
      };
      const newUserData = {
        teams: newUserInfo.teams,
      };
      // console.log(newUserData);return
      await UserService.updateUserById(userId, newUserData);
    }
    const team = await TeamService.updateTeamMembers(user.teamId, {
      createdById: userId,
    });

    //disable previous owner
    const userTeamIndex = userInfo.teams.findIndex(
      (obj) => obj.teamId.toString() == user.teamId
    );
    if (userTeamIndex >= 0) {
      userInfo.teams[userTeamIndex] = {
        teamId: userInfo.teams[userTeamIndex].teamId,
        roleId: userInfo.teams[userTeamIndex].roleId,
        status: USER_STATUS.DISABLED,
      };
      const userData = {
        teams: userInfo.teams,
      };
      // console.log(userData);return
      await UserService.updateUserById(user._id, userData)
        .then(async (userRes) => {
          const team = await TeamService.getTeamById(user.teamId);
          const filterTeamMembers = team.members.filter((obj) => {
            return obj.userId.toString() !== user._id;
          });
          await TeamService.updateTeamMembers(user.teamId, {
            members: filterTeamMembers,
          }).then((teamRes) => {
            return successResp(res, {
              msg: SUCCESS_MESSAGE.TRANSFERED,
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
    } else {
      return errorResp(res, {
        msg: ERROR_MESSAGE.NOT_FOUND,
        code: HTTP_STATUS.NOT_FOUND.CODE,
      });
    }
  } catch (error) {
    console.log(error);
    serverError(res, error);
  }
};

exports.changeName = async (req, res, next) => {
  try {
    8;
    const { user, firstName, lastName } = req.body;
    await UserService.updateUserById(user._id, { firstName, lastName })
      .then((userRes) => {
        return successResp(res, {
          msg: SUCCESS_MESSAGE.UPDATED,
          code: HTTP_STATUS.SUCCESS.CODE,
          data: { firstName, lastName },
        });
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
