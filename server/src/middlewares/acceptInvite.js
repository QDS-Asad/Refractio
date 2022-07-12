const { check, validationResult } = require('express-validator');
const { errorResp } = require("../helpers/error_helper");
const { HTTP_STATUS, ERROR_MESSAGE, REGEX_PATTERN } = require("../lib/constants");

module.exports.validateAcceptInvite = [
    check('email')
    .exists().bail().withMessage(ERROR_MESSAGE.REQUIRED)
    .notEmpty().bail().withMessage(ERROR_MESSAGE.NOT_EMPTY),
    check('firstName')
    .exists().bail().withMessage(ERROR_MESSAGE.REQUIRED)
    .notEmpty().bail().withMessage(ERROR_MESSAGE.NOT_EMPTY),
    check('lastName')
    .exists().bail().withMessage(ERROR_MESSAGE.REQUIRED)
    .notEmpty().bail().withMessage(ERROR_MESSAGE.NOT_EMPTY),
    check('newPassword')
    .exists().bail().withMessage(ERROR_MESSAGE.REQUIRED)
    .notEmpty().bail().withMessage(ERROR_MESSAGE.NOT_EMPTY)
    .matches(REGEX_PATTERN.PASSWORD).bail().withMessage(ERROR_MESSAGE.INVALID_PASSWORD),
    check('confirmPassword')
    .exists().bail().withMessage(ERROR_MESSAGE.REQUIRED)
    .notEmpty().bail().withMessage(ERROR_MESSAGE.NOT_EMPTY)
    .matches(REGEX_PATTERN.PASSWORD).bail().withMessage(ERROR_MESSAGE.INVALID_PASSWORD)
    .custom(async (confirmPassword, {req}) => {
        const newPassword = req.body.newPassword
        if(newPassword !== confirmPassword){
          throw new Error(ERROR_MESSAGE.PASSWORD_MUST_SAME)
        }
      }),
    (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return errorResp(res, { code: HTTP_STATUS.BAD_REQUEST.CODE, msg: errors.array() })
            }
            next();
        } catch (err) {
            res.status(HTTP_STATUS.INTERNAL_SERVER.CODE).json(errorResp());
        }
    }
]