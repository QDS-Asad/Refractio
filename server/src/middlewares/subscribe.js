const { check, validationResult } = require('express-validator');
const { errorResp } = require("../helpers/error_helper");
const { HTTP_STATUS, ERROR_MESSAGE, REGEX_PATTERN } = require("../lib/constants");

module.exports.validateSubscribe = [
    check('planId')
    .exists().bail().withMessage(ERROR_MESSAGE.REQUIRED)
    .notEmpty().bail().withMessage(ERROR_MESSAGE.NOT_EMPTY),
    check('priceId')
    .exists().bail().withMessage(ERROR_MESSAGE.REQUIRED)
    .notEmpty().bail().withMessage(ERROR_MESSAGE.NOT_EMPTY),
    check('nameOnCard')
    .exists().bail().withMessage(ERROR_MESSAGE.REQUIRED)
    .notEmpty().bail().withMessage(ERROR_MESSAGE.NOT_EMPTY),
    check('cardNumber')
    .exists().bail().withMessage(ERROR_MESSAGE.REQUIRED)
    .notEmpty().bail().withMessage(ERROR_MESSAGE.NOT_EMPTY),
    check('cardExpiry')
    .exists().bail().withMessage(ERROR_MESSAGE.REQUIRED)
    .notEmpty().bail().withMessage(ERROR_MESSAGE.NOT_EMPTY),
    check('cardCvv')
    .exists().bail().withMessage(ERROR_MESSAGE.REQUIRED)
    .notEmpty().bail().withMessage(ERROR_MESSAGE.NOT_EMPTY),
    check('teamName')
    .exists().bail().withMessage(ERROR_MESSAGE.REQUIRED)
    .notEmpty().bail().withMessage(ERROR_MESSAGE.NOT_EMPTY),
    check('autoRenew')
    .exists().bail().withMessage(ERROR_MESSAGE.REQUIRED)
    .notEmpty().bail().withMessage(ERROR_MESSAGE.NOT_EMPTY)
    .isBoolean().bail().withMessage(ERROR_MESSAGE.MUST_BOOLEAN),
    (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return errorResp(res, { code: HTTP_STATUS.BAD_REQUEST.CODE, msg: errors.array()})
            }
            next();
        } catch (err) {
            res.status(HTTP_STATUS.INTERNAL_SERVER.CODE).json(errorResp());
        }
    }
]