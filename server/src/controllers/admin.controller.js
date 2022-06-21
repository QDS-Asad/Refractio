const AdminService = require("../services/admin.service");
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
    await AdminService.createStripePlan(req.body)
      .then(async (stripeRes) => {
        const data = {
          planId: stripeRes.createdPlan.id,
          prices: stripeRes.createdPrices,
        };
        await AdminService.createPlan(data)
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
    await AdminService.getPlanByPlanId(planId)
      .then(async (planRes) => {
        const planData = {
          ...req.body,
          planId: planRes.planId,
          priceIds: planRes.prices
        };
        await AdminService.updateStripePlan(planData)
          .then(async (stripeRes) => {
            const data = {
              planId: stripeRes.updatedPlan.id,
              prices: stripeRes.createdPrices,
            };
            await AdminService.updatePlan(stripeRes.updatedPlan.id, data)
          .then((plansRes) => {
            return successResp(res, {
              msg: SUCCESS_MESSAGE.UpDATED,
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
    await AdminService.getAllStripePlans()
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
    await AdminService.getPlanByPlanId(planId)
      .then(async (planRes) => {
        console.log(planRes);
        const planData = {
          planId: planRes.planId,
          prices: planRes.prices,
        };
        await AdminService.getStripePlanById(planData)
          .then((stripeRes) => {
            return successResp(res, {
              msg: SUCCESS_MESSAGE.DATA_FETCHED,
              code: HTTP_STATUS.SUCCESS.CODE,
              data: stripeRes,
            });
          })
          .catch((error) => {
            console.log(error);
            serverError(res, error);
          });
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

//get prices of plan by planId
exports.getPricesByPlanId = async (req, res, next) => {
  try {
    const { planId } = req.params;
    await AdminService.getAllStripePricesByPlanId(planId)
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

// delete plan in stripe and db
exports.deletePlan = async (req, res, next) => {
  try {
    const { planId } = req.params;
    const planPrices = await AdminService.getAllStripePricesByPlanId(planId);
    await AdminService.deleteStripePlanById(planId, planPrices.data)
      .then(async (stripeRes) => {
          await AdminService.deletePlanByPlanId(planId)
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
