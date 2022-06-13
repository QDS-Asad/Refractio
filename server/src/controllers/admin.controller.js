const AdminService = require('../services/admin.service');
const { successResp, errorResp, serverError } = require('../helpers/error_helper');
const { ERROR_MESSAGE, HTTP_STATUS, SUCCESS_MESSAGE } = require('../lib/constants');

// register admin user
exports.createPlan = async (req, res, next) => {
  try {
    // console.log(req.originalUrl);return false;
    await AdminService.createStripePlan(req.body).then(async (stripeRes) => {
      const data= {
        planId: stripeRes.createdPlan.id,
        monthlyPriceId: stripeRes.monthlyPrice.id,
        yearlyPriceId: stripeRes.yearlyPrice.id,
      }
      await AdminService.createPlan(data).then((planRes) => {
        return successResp(res, { msg: SUCCESS_MESSAGE.EMAIL_SENT, code: HTTP_STATUS.SUCCESS.CODE, data: planRes })
      }).catch((error) => {
        serverError(res, error)
      });
    }).catch((error) => {
      console.log(error);
      serverError(res, error)
    });
  } catch (error) {
    serverError(res, error);
  }
};
