const { check, validationResult } = require('express-validator');
const { errorResp } = require("../helpers/error_helper");
const { HTTP_STATUS, ERROR_MESSAGE, REGEX_PATTERN } = require("../lib/constants");

module.exports.validateResetPassword = [
    
    check('newPassword', ERROR_MESSAGE.NEW_PASSWORD)
    .exists().bail()
    .notEmpty().bail()
    .matches(REGEX_PATTERN.PASSWORD).bail(),
    check('confirmPassword', ERROR_MESSAGE.CONFIRM_PASSWORD)
    .exists().bail()
    .notEmpty().bail()
    .matches(REGEX_PATTERN.PASSWORD).bail()
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
                return errorResp(res, { code: HTTP_STATUS.BAD_REQUEST.CODE, msg: { errors: errors.array() } })
            }
            next();
        } catch (err) {
            res.status(HTTP_STATUS.INTERNAL_SERVER.CODE).json(errorResp());
        }
    }
]