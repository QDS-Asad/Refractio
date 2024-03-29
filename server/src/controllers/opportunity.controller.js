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
  OPPORTUNITY_EMAIL_SUBJECT,
  EVALUATE_OPPORTUNITY_EMAIL_SUBJECT,
  EVALUATE_OPPORTUNITY_EMAIL_TEMPLATE,
  OPPORTUNITY_EVALUATION_STATUS,
  CLIENT_HOST,
} = require("../lib/constants");
const { response } = require("express");

// opportunities List
exports.opportunitiesList = async (req, res, next) => {
  try {
    const { user } = req.body;
    await OpportunityService.getOpportunitiesByUser(user).then(
      async (opportunities) => {
        let responses = [];
        await Promise.all(
          opportunities.map(async (opObj, opKey) => {
            let responded = false;
            let evaluated = false;
            const opportunityResponse = await OpportunityService.getOpportunityResponseByIdUserId(
              opObj._id,
              user._id
            );
            if(opportunityResponse && opportunityResponse.status == OPPORTUNITY_STATUS.PUBLISH){
              responded = true;
              const opportunityEvaluation =
              await OpportunityService.getOpportunityEvaluationByOpportunityIdUserId(
                opObj._id,
                user._id
              );
              if(opportunityEvaluation && opportunityEvaluation.status == OPPORTUNITY_STATUS.PUBLISH){
                evaluated = true;
              }
            }
            responses[opKey] = {
              _id: opObj._id,
              teamId: opObj.teamId,
              createdById: opObj.createdById,
              isOwner:
                user._id.toString() === opObj.createdById.toString(),
              name: opObj.name,
              description: opObj.description,
              status: opObj.status,
              participants: opObj.participants,
              comprehension: opObj.comprehension,
              qualityOfIdea: opObj.qualityOfIdea,
              responded,
              evaluated
            };
          })
        );
        responses = responses.filter((obj) => (user._id.toString() === obj.createdById.toString()) || (user._id.toString() !== obj.createdById.toString() && obj.status !== OPPORTUNITY_STATUS.DRAFT))
        return successResp(res, {
          msg: SUCCESS_MESSAGE.DATA_FETCHED,
          code: HTTP_STATUS.SUCCESS.CODE,
          data: responses,
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
      // participants: [user._id],
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
    if (
      req.body.status === OPPORTUNITY_STATUS.PUBLISH &&
      req.body.comprehension &&
      req.body.comprehension.questions &&
      req.body.comprehension.questions.length < 1
    ) {
      return errorResp(res, {
        msg: ERROR_MESSAGE.COMP_MIN_ONE_QUESTION,
        code: HTTP_STATUS.BAD_REQUEST.CODE,
      });
    }
    if (
      req.body.status === OPPORTUNITY_STATUS.PUBLISH &&
      req.body.qualityOfIdea &&
      req.body.qualityOfIdea.questions &&
      req.body.qualityOfIdea.questions.length < 1
    ) {
      return errorResp(res, {
        msg: ERROR_MESSAGE.QOA_MIN_ONE_QUESTION,
        code: HTTP_STATUS.BAD_REQUEST.CODE,
      });
    }
    const opportunityInfo = await OpportunityService.getOpportunityById(
      opportunityId
    );
    const filterParticipants = opportunityInfo.participants;
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
            subject: OPPORTUNITY_EMAIL_SUBJECT,
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
        if (opportunityInfo.createdById.toString() !== user._id.toString()) {
          return errorResp(res, {
            msg: ERROR_MESSAGE.NOT_ALLOWED,
            code: HTTP_STATUS.BAD_REQUEST.CODE,
          });
        }
        const userResponse =
          await OpportunityService.getOpportunityResponseByIdUserId(
            opportunityId,
            userId
          );
        if (userResponse) {
          const userResponseEvaluation =
            await OpportunityService.getOpportunityEvaluationByResponseIdUserId(
              userResponse._id,
              userId
            );

          if (userResponse || userResponseEvaluation) {
            return errorResp(res, {
              msg: ERROR_MESSAGE.PARTICIPANT_RESPONDED,
              code: HTTP_STATUS.BAD_REQUEST.CODE,
            });
          }
        }
        const participants = opportunityInfo.participants.filter(
          (part) => part.toString() !== userId.toString()
        );
        const requestBody = {
          participants,
        };
        await OpportunityService.updateOpportunity(opportunityId, requestBody)
          .then((opportunityRes) => {
            return successResp(res, {
              msg: SUCCESS_MESSAGE.DELETED,
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
    const { user } = req.body;
    const opportunityInfo = await OpportunityService.getOpportunityById(
      opportunityId
    );
    if (opportunityInfo.createdById !== user._id) {
      return errorResp(res, {
        msg: ERROR_MESSAGE.NOT_ALLOWED,
        code: HTTP_STATUS.BAD_REQUEST.CODE,
      });
    }
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

// get opportunity response by id
exports.getOpportunityResponseById = async (req, res, next) => {
  try {
    const { opportunityId } = req.params;
    const { user } = req.body;

    await OpportunityService.getOpportunityResponseByIdUserId(
      opportunityId,
      user._id
    )
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

const isParticipantAllowed = async (opportunityId, user) => {
  const opportunityInfo = await OpportunityService.getOpportunityById(
    opportunityId
  );
  return opportunityInfo.participants.some((el) => el === user._id);
};

// get opportunity responses by id
exports.getOpportunityResponsesById = async (req, res, next) => {
  try {
    const { opportunityId } = req.params;
    const { user } = req.body;
    const opportunityInfo = await OpportunityService.getOpportunityById(
      opportunityId
    );
    await OpportunityService.getOpportunityResponsesByOpportunityId(
      opportunityId
    )
      .then(async (opportunityResponses) => {
        opportunityResponses = opportunityResponses.filter((obj) => obj.userId !== user._id);
        let responses = [];
        await Promise.all(
          opportunityResponses.map(async (obj, key) => {
            const opportunityEvaluations =
              await OpportunityService.getOpportunityEvaluationByResponseIdUserId(
                obj._id,
                user._id
              );
            let evaluation = "";
            let evalObj = {};
            if (
              opportunityEvaluations &&
              ((opportunityEvaluations.comprehension &&
              opportunityEvaluations.comprehension.score) ||
              (opportunityEvaluations.qualityOfIdea &&
              opportunityEvaluations.qualityOfIdea.score))
            ) {
              evalObj = {status: opportunityEvaluations.status, comprehensionScore: opportunityEvaluations.comprehension.score, qualityOfIdeaScore: opportunityEvaluations.qualityOfIdea.score};
            }
            if (
              opportunityEvaluations &&
              opportunityEvaluations.comprehension &&
              opportunityEvaluations.comprehension.score &&
              opportunityEvaluations.qualityOfIdea &&
              opportunityEvaluations.qualityOfIdea.score
            ) {
              evalObj = {...evalObj, evaluation: OPPORTUNITY_EVALUATION_STATUS.COMPLETED};
            } else {
              evalObj = {...evalObj, evaluation: OPPORTUNITY_EVALUATION_STATUS.PENDING};
            }
            let comprehension_answers = [];
            obj.comprehension.answers.map((comp, compKey) => {
              let queObj = opportunityInfo.comprehension.questions.find(
                (que) => que._id.toString() === comp.questionId
              );
              if (queObj) {
                comprehension_answers[compKey] = {
                  question: queObj.question,
                  answer: comp.answer,
                  order: queObj.order,
                };
              }
            });
            let qualityOfIdea_answers = [];
            obj.qualityOfIdea.answers.map((qoa, compKey) => {
              let qoaObj = opportunityInfo.qualityOfIdea.questions.find(
                (que) => que._id.toString() === qoa.questionId
              );
              if (qoaObj) {
                qualityOfIdea_answers[compKey] = {
                  question: qoaObj.question,
                  answer: qoa.answer,
                  order: qoaObj.order,
                };
              }
            });
            responses[key] = {
              _id: obj._id,
              opportunityId: obj.opportunityId,
              name: `Participant No ${key + 1}`,
              evaluation,
              status: obj.status,
              comprehension: comprehension_answers,
              qualityOfIdea: qualityOfIdea_answers,
              opportunityEvaluations: evalObj,
            };
          })
        );
        responses.sort(function (a, b) {
          return a.evaluation - b.evaluation;
        });
        return successResp(res, {
          msg: SUCCESS_MESSAGE.DATA_FETCHED,
          code: HTTP_STATUS.SUCCESS.CODE,
          data: responses,
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
    if (
      req.body.status === OPPORTUNITY_STATUS.PUBLISH &&
      req.body.comprehension &&
      req.body.comprehension.answers &&
      req.body.comprehension.answers.length < 1
    ) {
      return errorResp(res, {
        msg: ERROR_MESSAGE.COMP_MIN_ONE_ANSWER,
        code: HTTP_STATUS.BAD_REQUEST.CODE,
      });
    }
    if (
      req.body.status === OPPORTUNITY_STATUS.PUBLISH &&
      req.body.qualityOfIdea &&
      req.body.qualityOfIdea.answers &&
      req.body.qualityOfIdea.answers.length < 1
    ) {
      return errorResp(res, {
        msg: ERROR_MESSAGE.QOA_MIN_ONE_ANSWER,
        code: HTTP_STATUS.BAD_REQUEST.CODE,
      });
    }
    const participantAllowed = await isParticipantAllowed(opportunityId, user);
    if (!participantAllowed) {
      return errorResp(res, {
        msg: ERROR_MESSAGE.NOT_ALLOWED,
        code: HTTP_STATUS.BAD_REQUEST.CODE,
      });
    }
    const requestBody = {
      userId: user._id,
      teamId: user.teamId,
      opportunityId: opportunityId,
      status: req.body.status,
      comprehension: req.body.comprehension || undefined,
      qualityOfIdea: req.body.qualityOfIdea || undefined,
    };

    const opportunityresponse =
      await OpportunityService.getOpportunityResponseByIdUserId(
        opportunityId,
        user._id
      );
    if (opportunityresponse) {
      await OpportunityService.updateAnswerOpportunity(
        opportunityresponse._id,
        requestBody
      )
        .then(async (opportunityRes) => {
          answerOpportunityResponse(req, res, opportunityRes);
        })
        .catch((error) => {
          return errorResp(res, {
            msg: ERROR_MESSAGE.NOT_FOUND,
            code: HTTP_STATUS.BAD_REQUEST.CODE,
          });
        });
    } else {
      await OpportunityService.answerOpportunity(requestBody)
        .then(async (opportunityRes) => {
          answerOpportunityResponse(req, res, opportunityRes);
        })
        .catch((error) => {
          return errorResp(res, {
            msg: ERROR_MESSAGE.NOT_FOUND,
            code: HTTP_STATUS.BAD_REQUEST.CODE,
          });
        });
    }
  } catch (error) {
    serverError(res, error);
  }
};

const answerOpportunityResponse = async (req, res, opportunityRes) => {
  try {
    const { opportunityId } = req.params;
    const opportunityInfo = await OpportunityService.getOpportunityById(
      opportunityId
    );
    const opportunityResponses =
      await OpportunityService.getOpportunityResponsesByOpportunityId(
        opportunityId
      );
    const filterParticipants = opportunityInfo.participants;
    if (req.body.status === OPPORTUNITY_STATUS.PUBLISH && opportunityResponses.length == filterParticipants.length) {
      const opportunityURes = await OpportunityService.updateOpportunity(opportunityId, {
        status: OPPORTUNITY_STATUS.EVALUATING,
      });
      const participantsEmails = await UserService.getParticipants(
        opportunityRes.participants
      );
      const link = `${CLIENT_HOST}/opportunityevaluate/${opportunityId}`;
      const emailObj = {
        email: participantsEmails,
        subject: EVALUATE_OPPORTUNITY_EMAIL_SUBJECT,
        html: EVALUATE_OPPORTUNITY_EMAIL_TEMPLATE({ link }),
      };
      await UserService.tokenVerificationEmail(emailObj)
        .then((emailRes) => {
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
    } else {
      await OpportunityService.updateOpportunity(opportunityId, {
        status: OPPORTUNITY_STATUS.ANSWERING,
      });
      return successResp(res, {
        msg: SUCCESS_MESSAGE.ANSWERED,
        code: HTTP_STATUS.SUCCESS.CODE,
      });
    }
  } catch (error) {
    serverError(res, error);
  }
};

// evaluate answer Opportunity
exports.evaluateAnswerOpportunity = async (req, res, next) => {
  try {
    const { opportunityResponseId } = req.params;
    const { user } = req.body;
    const opportunityresponse =
      await OpportunityService.getOpportunityResponseById(
        opportunityResponseId
      );
    const opportunityId = opportunityresponse.opportunityId;
    const participantAllowed = await isParticipantAllowed(opportunityId, user);
    if (!participantAllowed) {
      return errorResp(res, {
        msg: ERROR_MESSAGE.NOT_ALLOWED,
        code: HTTP_STATUS.BAD_REQUEST.CODE,
      });
    }
    const requestBody = {
      userId: user._id,
      teamId: user.teamId,
      opportunityId,
      opportunityResponseId,
      status: req.body.status,
      comprehension: req.body.comprehension || undefined,
      qualityOfIdea: req.body.qualityOfIdea || undefined,
    };
    const opportunityEvaluateInfo =
      await OpportunityService.getOpportunityEvaluationByResponseIdUserId(
        opportunityResponseId,
        user._id
      );
    if (opportunityEvaluateInfo) {
      await OpportunityService.updateEvaluateOpportunity(
        opportunityEvaluateInfo._id,
        requestBody
      )
        .then(async (opportunityRes) => {
          evaluateAnswerOpportunityResponse(
            req,
            res,
            opportunityId,
            opportunityResponseId
          );
        })
        .catch((error) => {
          return errorResp(res, {
            msg: ERROR_MESSAGE.NOT_FOUND,
            code: HTTP_STATUS.BAD_REQUEST.CODE,
          });
        });
    } else {
      await OpportunityService.evaluateOpportunity(requestBody)
        .then(async (opportunityRes) => {
          evaluateAnswerOpportunityResponse(
            req,
            res,
            opportunityId,
            opportunityResponseId
          );
        })
        .catch((error) => {
          return errorResp(res, {
            msg: ERROR_MESSAGE.NOT_FOUND,
            code: HTTP_STATUS.BAD_REQUEST.CODE,
          });
        });
    }
  } catch (error) {
    serverError(res, error);
  }
};

const evaluateAnswerOpportunityResponse = async (
  req,
  res,
  opportunityId,
  opportunityResponseId
) => {
  if (req.body.status === OPPORTUNITY_STATUS.PUBLISH) {
    await OpportunityService.updateOpportunityEvaluationsByResponseIdUserId(opportunityId, req.body.user._id, {
      status: OPPORTUNITY_STATUS.PUBLISH
    });
  }
  const opportunityInfo = await OpportunityService.getOpportunityById(
    opportunityId
  );
  const opportunityEvaluation =
    await OpportunityService.getOpportunityEvaluationsByOpportunityId(
      opportunityId
    );
  const filterParticipants = opportunityInfo.participants;
  if (req.body.status === OPPORTUNITY_STATUS.PUBLISH && opportunityEvaluation.length == (filterParticipants.length * (filterParticipants.length - 1))) {
    await OpportunityService.updateOpportunity(opportunityId, {
      status: OPPORTUNITY_STATUS.COMPLETED
    });
    return successResp(res, {
      msg: SUCCESS_MESSAGE.UPDATED,
      code: HTTP_STATUS.SUCCESS.CODE,
    });
  } else {
    await OpportunityService.updateOpportunity(opportunityId, {
      status: OPPORTUNITY_STATUS.EVALUATING,
    });
    return successResp(res, {
      msg: SUCCESS_MESSAGE.EVALUATED,
      code: HTTP_STATUS.SUCCESS.CODE,
    });
  }
};

// evaluation results
exports.evalutationResultsByParticipants = async (req, res, next) => {
  try {
    const { opportunityId } = req.params;
    const { user } = req.body;
    const opportunityInfo = await OpportunityService.getOpportunityById(
      opportunityId
    );
    if (opportunityInfo.createdById !== user._id) {
      return errorResp(res, {
        msg: ERROR_MESSAGE.NOT_ALLOWED,
        code: HTTP_STATUS.BAD_REQUEST.CODE,
      });
    }
    await OpportunityService.getOpportunityResponsesByOpportunityId(
      opportunityId
    )
      .then(async (results) => {
        let participantResults = [];
        await Promise.all(
          results.map(async (obj, key) => {
            const userInfo = await UserService.getUserById(obj.userId);
            const evaluationResults =
              await OpportunityService.getOpportunityEvaluationByResponseId(
                obj._id
              );
            if (evaluationResults.length) {
              let evaluationComprehensionScores = [];
              let evaluationQualityOfIdeaScores = [];
              let totalComprehensionEvaluationScore = 0;
              let totalQualityOfIdeaEvaluationScore = 0;
              let totalComprehensionAverageEvaluationScore = 0;
              let totalQualityOfIdeaAverageEvaluationScore = 0;
              await Promise.all(
                evaluationResults.map(async (el, elKey) => {
                  const elUserInfo = await UserService.getUserById(el.userId);

                  evaluationComprehensionScores[elKey] = {
                    firstName: elUserInfo.firstName,
                    lastName: elUserInfo.lastName,
                    evaluation: Number(el.comprehension.score),
                  };
                  evaluationQualityOfIdeaScores[elKey] = {
                    firstName: elUserInfo.firstName,
                    lastName: elUserInfo.lastName,
                    evaluation: Number(el.qualityOfIdea.score),
                  };
                })
              );
              evaluationComprehensionScores.map((compE) => {
                totalComprehensionEvaluationScore += compE.evaluation;
              });
              totalComprehensionAverageEvaluationScore =
                totalComprehensionEvaluationScore /
                evaluationComprehensionScores.length;

              evaluationQualityOfIdeaScores.map((compE) => {
                totalQualityOfIdeaEvaluationScore +=
                  compE.evaluation * totalComprehensionAverageEvaluationScore;
              });
              totalQualityOfIdeaAverageEvaluationScore =
                totalQualityOfIdeaEvaluationScore /
                evaluationQualityOfIdeaScores.length;
              let comprehension_answers = [];
              obj.comprehension.answers.map((comp, compKey) => {
                let queObj = opportunityInfo.comprehension.questions.find(
                  (que) => que._id.toString() === comp.questionId
                );
                comprehension_answers[compKey] = {
                  question: queObj.question,
                  answer: comp.answer,
                  order: queObj.order,
                };
              });
              let qualityOfIdea_answers = [];
              obj.qualityOfIdea.answers.map((qoa, compKey) => {
                let qoaObj = opportunityInfo.qualityOfIdea.questions.find(
                  (que) => que._id.toString() === qoa.questionId
                );
                qualityOfIdea_answers[compKey] = {
                  question: qoaObj.question,
                  answer: qoa.answer,
                  order: qoaObj.order,
                };
              });
              participantResults[key] = {
                _id: obj._id,
                opportunityId: obj.opportunityId,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                status: obj.status,
                // totalComprehensionEvaluationScore,
                totalComprehensionAverageEvaluationScore,
                // totalQualityOfIdeaEvaluationScore,
                totalQualityOfIdeaAverageEvaluationScore: totalQualityOfIdeaAverageEvaluationScore.toFixed(2),
                comprehension: {
                  qa: comprehension_answers,
                  evaluation: evaluationComprehensionScores,
                },
                qualityOfIdea: {
                  qa: qualityOfIdea_answers,
                  evaluation: evaluationQualityOfIdeaScores,
                },
              };
            }
          })
        );
        return successResp(res, {
          msg: SUCCESS_MESSAGE.DATA_FETCHED,
          code: HTTP_STATUS.SUCCESS.CODE,
          data: participantResults,
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

exports.getAllOpportunities = async (req, res, next) => {
  try {
    const { page, page_size } = req.query;
    const filterData = {
      page,
      page_size
    };
    await OpportunityService.getAllOpportunities(filterData)
      .then(async (opportunityRes) => {
        let docs = [];
        await Promise.all(
          opportunityRes.docs.map(async (opportunity, key) => {
            const opportunityObj = opportunity._doc;
            const userData = await UserService.getUserById(opportunityObj.createdById);
            const teamData = await TeamService.getTeamById(opportunityObj.teamId);
            // if(teamData){
              docs[key] = {
                name: opportunityObj.name,
                description: opportunityObj.description,
                totalParticipants: opportunityObj.participants.length,
                status: opportunityObj.status,
                // firstName: userData.firstName,
                // lastName: userData.lastName,
                // email: userData.email,
                // teamName: teamData.name
              }
            // }
            
          })
        )
        opportunityRes = {
          ...opportunityRes,
          docs
        }
        return successResp(res, {
          msg: SUCCESS_MESSAGE.DATA_FETCHED,
          code: HTTP_STATUS.SUCCESS.CODE,
          data: opportunityRes,
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
}
