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
    // console.log(req.originalUrl);return false;
    await AdminService.createStripePlan(req.body)
      .then(async (stripeRes) => {
        const data = {
          planId: stripeRes.createdPlan.id,
          monthlyPriceId: stripeRes.monthlyPrice.id,
          yearlyPriceId: stripeRes.yearlyPrice.id,
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
        console.log(error);
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
          monthlyPriceId: planRes.monthlyPriceId,
          yearlyPriceId: planRes.yearlyPriceId,
        };
        await AdminService.updateStripePlan(planData)
          .then((stripeRes) => {
            console.log(stripeRes);
            return successResp(res, {
              msg: SUCCESS_MESSAGE.UpDATED,
              code: HTTP_STATUS.SUCCESS.CODE,
              data: planRes,
            });
          })
          .catch((error) => {
            serverError(res, error);
          });
      })
      .catch((error) => {
        console.log(error);
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
        console.log(stripeRes);
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
          monthlyPriceId: planRes.monthlyPriceId,
          yearlyPriceId: planRes.yearlyPriceId,
        };
        await AdminService.getStripePlanById(planData)
          .then((stripeRes) => {
            console.log(stripeRes);
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
        console.log(error);
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
    await AdminService.getAllStripePricesByPlanId(planId)
      .then((stripeRes) => {
        console.log(stripeRes);
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
    console.log(planPrices);
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
        console.log(error);
        serverError(res, error);
      });
  } catch (error) {
    serverError(res, error);
  }
};
