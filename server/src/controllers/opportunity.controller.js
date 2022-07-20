const UserService = require("../services/user.service");
const RoleService = require("../services/role.service");
const TeamService = require("../services/team.service");
const OpportunityService = require("../services/opportunity.service");
const BillingService = require("../services/billing.service");
const {
  successResp,
  errorResp,
  serverError,
} = require("../helpers/error_helper");
const {
  ERROR_MESSAGE,
  HTTP_STATUS,
  SUCCESS_MESSAGE,
  TOTAL_OPPORTUNITIES,
  OPPORTUNITY_STATUS,
  REQUIRED_MEMBER_TO_PUBLISH,
  OPPORTUNITY_EMAIL_TEMPLATE,
} = require("../lib/constants");

// opportunities List
exports.opportunitiesList = async (req, res, next) => {
  try {
    const { user } = req.body;
    await OpportunityService.getOpportunitiesByUser(user).then(
      (opportunities) => {
        console.log(opportunities);
        Promise.all(
          opportunities.map(async (obj, key) => {
            const opportunityResponses =
              await OpportunityService.getOpportunityResponsesByOpportunityId(
                obj._id
              );
            const filterParticipants = obj.participants.filter(
              (el) => el !== obj.createdById
            );
            opportunities[key] = {
              ...obj,
              canEvaluate: opportunityResponses.length == filterParticipants,
            };
          })
        );
        return successResp(res, {
          msg: SUCCESS_MESSAGE.DATA_FETCHED,
          code: HTTP_STATUS.SUCCESS.CODE,
          data: opportunities,
        });
      }
    );
  } catch (error) {
    serverError(res, error);
  }
};

// create Opportunity
exports.createOpportunity = async (req, res, next) => {
  const { user } = req.body;
  try {
    const opportunities = await OpportunityService.getOpportunitiesByUser(user);
    if (opportunities.length == TOTAL_OPPORTUNITIES) {
      return errorResp(res, {
        msg: ERROR_MESSAGE.OPPORTUNITY_LIMIT_EXCEED,
        code: HTTP_STATUS.BAD_REQUEST,
      });
    }
    const requestBody = {
      createdById: user._id,
      teamId: user.teamId,
      name: req.body.name,
      description: req.body.description,
      participants: [user._id],
    };
    await OpportunityService.createOpportunity(requestBody)
      .then((opportunityRes) => {
        return successResp(res, {
          msg: SUCCESS_MESSAGE.CREATED,
          code: HTTP_STATUS.SUCCESS.CODE,
        });
      })
      .catch((error) => {
        return errorResp(res, {
          msg: ERROR_MESSAGE.NOT_FOUND,
          code: HTTP_STATUS.BAD_REQUEST.CODE,
        });
      });
  } catch (error) {
    serverError(res, error);
  }
};

// update Opportunity
exports.updateOpportunity = async (req, res, next) => {
  try {
    const { opportunityId } = req.params;
    const { user } = req.body;
    if (req.body.comprehension.questions.length < 1) {
      return errorResp(res, {
        msg: ERROR_MESSAGE.COMP_MIN_ONE_QUESTION,
        code: HTTP_STATUS.BAD_REQUEST.CODE,
      });
    }
    if (req.body.qualityOfIdea.questions.length < 1) {
      return errorResp(res, {
        msg: ERROR_MESSAGE.QOA_MIN_ONE_QUESTION,
        code: HTTP_STATUS.BAD_REQUEST.CODE,
      });
    }
    const opportunityInfo = await OpportunityService.getOpportunityById(
      opportunityId
    );
    const filterParticipants =
      (opportunityInfo.createdById == user._id &&
        opportunityInfo.participants.filter((obj) => obj !== user._id)) ||
      opportunityInfo.participants;
    if (
      req.body.status === OPPORTUNITY_STATUS.PUBLISH &&
      filterParticipants.length < REQUIRED_MEMBER_TO_PUBLISH
    ) {
      return errorResp(res, {
        msg: ERROR_MESSAGE.REQUIRED_MEMBER_IN_OPPORTUNITY,
        code: HTTP_STATUS.BAD_REQUEST.CODE,
      });
    }
    const requestBody = {
      name: req.body.name || undefined,
      description: req.body.description || undefined,
      status: req.body.status,
      comprehension: req.body.comprehension || undefined,
      qualityOfIdea: req.body.qualityOfIdea || undefined,
    };
    await OpportunityService.updateOpportunity(opportunityId, requestBody)
      .then(async (opportunityRes) => {
        if (req.body.status === OPPORTUNITY_STATUS.PUBLISH) {
          const participantsEmails = await UserService.getParticipants(
            opportunityRes.participants
          );
          const link = `${CLIENT_HOST}/opportunityresponse/${opportunityId}`;
          const emailObj = {
            email: participantsEmails,
            subjact: OPPORTUNITY_EMAIL_SUBJECT,
            html: OPPORTUNITY_EMAIL_TEMPLATE({ link }),
          };
          await UserService.tokenVerificationEmail(emailObj)
            .then((emailRes) => {
              return successResp(res, {
                msg: SUCCESS_MESSAGE.UPDATED,
                code: HTTP_STATUS.SUCCESS.CODE,
              });
            })
            .catch((error) => {
              return errorResp(res, {
                msg: ERROR_MESSAGE.NOT_FOUND,
                code: HTTP_STATUS.BAD_REQUEST.CODE,
              });
            });
        } else {
          return successResp(res, {
            msg: SUCCESS_MESSAGE.UPDATED,
            code: HTTP_STATUS.SUCCESS.CODE,
          });
        }
      })
      .catch((error) => {
        return errorResp(res, {
          msg: ERROR_MESSAGE.NOT_FOUND,
          code: HTTP_STATUS.BAD_REQUEST.CODE,
        });
      });
  } catch (error) {
    serverError(res, error);
  }
};

// add Opportunity member
exports.addOpportunityMember = async (req, res, next) => {
  try {
    const { opportunityId, userId } = req.params;
    const { user } = req.body;
    await OpportunityService.getOpportunityById(opportunityId)
      .then(async (opportunityInfo) => {
        const participant = opportunityInfo.participants.find(
          (part) => part.toString() == userId.toString()
        );
        if (participant) {
          return errorResp(res, {
            msg: ERROR_MESSAGE.ALLREADY_IN_OPPORTUNITY,
            code: HTTP_STATUS.BAD_REQUEST.CODE,
          });
        } else {
          let participants = opportunityInfo.participants;
          participants.push(userId);
          const requestBody = {
            participants,
          };
          await OpportunityService.updateOpportunity(opportunityId, requestBody)
            .then((opportunityRes) => {
              return successResp(res, {
                msg: SUCCESS_MESSAGE.UPDATED,
                code: HTTP_STATUS.SUCCESS.CODE,
              });
            })
            .catch((error) => {
              return errorResp(res, {
                msg: ERROR_MESSAGE.NOT_FOUND,
                code: HTTP_STATUS.BAD_REQUEST.CODE,
              });
            });
        }
      })
      .catch((error) => {
        return errorResp(res, {
          msg: ERROR_MESSAGE.NOT_FOUND,
          code: HTTP_STATUS.BAD_REQUEST.CODE,
        });
      });
  } catch (error) {
    serverError(res, error);
  }
};

// remove Opportunity member
exports.removeOpportunityMember = async (req, res, next) => {
  try {
    const { opportunityId, userId } = req.params;
    const { user } = req.body;
    await OpportunityService.getOpportunityById(opportunityId)
      .then(async (opportunityInfo) => {
        const participants = opportunityInfo.participants.filter(
          (part) => part.toString() !== userId.toString()
        );
        const requestBody = {
          participants,
        };
        await OpportunityService.updateOpportunity(opportunityId, requestBody)
          .then((opportunityRes) => {
            return successResp(res, {
              msg: SUCCESS_MESSAGE.UPDATED,
              code: HTTP_STATUS.SUCCESS.CODE,
            });
          })
          .catch((error) => {
            return errorResp(res, {
              msg: ERROR_MESSAGE.NOT_FOUND,
              code: HTTP_STATUS.BAD_REQUEST.CODE,
            });
          });
      })
      .catch((error) => {
        return errorResp(res, {
          msg: ERROR_MESSAGE.NOT_FOUND,
          code: HTTP_STATUS.BAD_REQUEST.CODE,
        });
      });
  } catch (error) {
    serverError(res, error);
  }
};

//delete opportunity
exports.deleteOpportunity = async (req, res, next) => {
  try {
    const { opportunityId } = req.params;
    await OpportunityService.deleteOpportunity(opportunityId)
      .then(() => {
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
  } catch (error) {
    serverError(res, error);
  }
};

// get opportunity by id
exports.getOpportunityById = async (req, res, next) => {
  try {
    const { opportunityId } = req.params;
    await OpportunityService.getOpportunityById(opportunityId)
      .then((opportunityInfo) => {
        return successResp(res, {
          msg: SUCCESS_MESSAGE.DATA_FETCHED,
          code: HTTP_STATUS.SUCCESS.CODE,
          data: opportunityInfo,
        });
      })
      .catch((error) => {
        errorResp(res, {
          msg: ERROR_MESSAGE.NOT_FOUND,
          code: HTTP_STATUS.NOT_FOUND.CODE,
        });
      });
  } catch (error) {}
};

// answer Opportunity
exports.answerOpportunity = async (req, res, next) => {
  try {
    const { opportunityId } = req.params;
    const { user } = req.body;
    const requestBody = {
      userId: user._id,
      teamId: user.teamId,
      opportunityId: opportunityId,
      comprehension: req.body.comprehension || undefined,
      qualityOfIdea: req.body.qualityOfIdea || undefined,
    };
    await OpportunityService.answerOpportunity(requestBody)
      .then(async (opportunityRes) => {
        await OpportunityService.updateOpportunity(opportunityId, {
          stauts: OPPORTUNITY_STATUS.ANSWERING,
        });
        return successResp(res, {
          msg: SUCCESS_MESSAGE.ANSWERED,
          code: HTTP_STATUS.SUCCESS.CODE,
        });
      })
      .catch((error) => {
        return errorResp(res, {
          msg: ERROR_MESSAGE.NOT_FOUND,
          code: HTTP_STATUS.BAD_REQUEST.CODE,
        });
      });
  } catch (error) {
    serverError(res, error);
  }
};

const getOpportunitiesByStatus = async (opportunities) => {
  const completed = opportunities.filter(
    (obj) => obj.status == OPPORTUNITY_STATUS.COMPLETED
  );
  const published = opportunities.filter(
    (obj) => obj.status == OPPORTUNITY_STATUS.PUBLISH
  );
  const drafted = opportunities.filter(
    (obj) => obj.status == OPPORTUNITY_STATUS.DRAFT
  );
  return { completed, published, drafted };
};
