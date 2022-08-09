const PlanService = require("../services/plan.service");
const {
  successResp,
  errorResp,
  serverError,
} = require("../helpers/error_helper");
const {
  ERROR_MESSAGE,
  HTTP_STATUS,
  SUCCESS_MESSAGE,
} = require("../lib/constants");

// create plan in stripe and db
exports.createPlan = async (req, res, next) => {
  try {
    await PlanService.createStripePlan(req.body)
      .then(async (stripeRes) => {
        const data = {
          planId: stripeRes.createdPlan.id,
          prices: stripeRes.createdPrices,
        };
        await PlanService.createPlan(data)
          .then((planRes) => {
            return successResp(res, {
              msg: SUCCESS_MESSAGE.CREATED,
              code: HTTP_STATUS.SUCCESS.CODE,
              data: planRes,
            });
          })
          .catch((error) => {
            serverError(res, error);
          });
      })
      .catch((error) => {
        serverError(res, error);
      });
  } catch (error) {
    serverError(res, error);
  }
};

exports.updatePlan = async (req, res, next) => {
  try {
    const { planId } = req.params;
    await PlanService.getPlanByPlanId(planId)
      .then(async (planRes) => {
        const planData = {
          ...req.body,
          planId: planRes.planId,
          priceIds: planRes.prices
        };
        await PlanService.updateStripePlan(planData)
          .then(async (stripeRes) => {
            const data = {
              planId: stripeRes.updatedPlan.id,
              prices: stripeRes.createdPrices,
            };
            await PlanService.updatePlan(stripeRes.updatedPlan.id, data)
          .then((plansRes) => {
            return successResp(res, {
              msg: SUCCESS_MESSAGE.UPDATED,
              code: HTTP_STATUS.SUCCESS.CODE,
              data: plansRes,
            });
          })
          .catch((error) => {
            serverError(res, error);
          });
          })
          .catch((error) => {
            serverError(res, error);
          });
      })
      .catch((error) => {
        serverError(res, error);
      });
  } catch (error) {
    serverError(res, error);
  }
};

exports.getAllPlans = async (req, res, next) => {
  try {
    await PlanService.getAllStripePlans()
      .then((stripeRes) => {
        return successResp(res, {
          msg: SUCCESS_MESSAGE.DATA_FETCHED,
          code: HTTP_STATUS.SUCCESS.CODE,
          data: stripeRes,
        });
      })
      .catch((error) => {
        serverError(res, error);
      });
  } catch (error) {
    serverError(res, error);
  }
};

exports.getPlanByPlanId = async (req, res, next) => {
  try {
    const { planId } = req.params;
    await PlanService.getPlanByPlanId(planId)
      .then(async (planRes) => {
        const planData = {
          planId: planRes.planId,
          prices: planRes.prices,
        };
        await PlanService.getStripePlanById(planData)
          .then((stripeRes) => {
            return successResp(res, {
              msg: SUCCESS_MESSAGE.DATA_FETCHED,
              code: HTTP_STATUS.SUCCESS.CODE,
              data: stripeRes,
            });
          })
          .catch((error) => {
            serverError(res, error);
          });
      })
      .catch((error) => {
        serverError(res, error);
      });
  } catch (error) {
    serverError(res, error);
  }
};

//get prices of plan by planId
exports.getPricesByPlanId = async (req, res, next) => {
  try {
    const { planId } = req.params;
    await PlanService.getAllStripePricesByPlanId(planId)
      .then((stripeRes) => {
        return successResp(res, {
          msg: SUCCESS_MESSAGE.DATA_FETCHED,
          code: HTTP_STATUS.SUCCESS.CODE,
          data: {plan: planId, prices: stripeRes.data},
        });
      })
      .catch((error) => {
        serverError(res, error);
      });
  } catch (error) {
    serverError(res, error);
  }
};

// delete plan in stripe and db
exports.deletePlan = async (req, res, next) => {
  try {
    const { planId } = req.params;
    const planUsed = await PlanService.getUserPlanByPlanId(planId);
    if(planUsed.length){
      return errorResp(res, {msg: ERROR_MESSAGE.PLAN_USED, code: HTTP_STATUS.BAD_REQUEST.CODE})
    }
    const planPrices = await PlanService.getAllStripePricesByPlanId(planId);
    await PlanService.deleteStripePlanById(planId, planPrices.data)
      .then(async (stripeRes) => {
          await PlanService.deletePlanByPlanId(planId)
            .then((planRes) => {
              return successResp(res, {
                msg: SUCCESS_MESSAGE.DELETED,
                code: HTTP_STATUS.SUCCESS.CODE,
                data: planRes,
              });
            })
            .catch((error) => {
              serverError(res, error);
            });
      })
      .catch((error) => {
        serverError(res, error);
      });
  } catch (error) {
    serverError(res, error);
  }
};
