const { check, validationResult } = require('express-validator');
const { errorResp } = require("../helpers/error_helper");
const { HTTP_STATUS, ERROR_MESSAGE, REGEX_PATTERN } = require("../lib/constants");

module.exports.validateLogin = [
    check('email', ERROR_MESSAGE.EMAIL)
    .exists().bail()
    .notEmpty().bail(),
    check('password', ERROR_MESSAGE.PASSWORD)
    .exists().bail()
    .notEmpty().bail()
    .matches(REGEX_PATTERN.PASSWORD).bail(),
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