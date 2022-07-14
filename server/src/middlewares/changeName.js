const { check, validationResult } = require('express-validator');
const { errorResp } = require("../helpers/error_helper");
const { HTTP_STATUS, ERROR_MESSAGE, REGEX_PATTERN } = require("../lib/constants");

module.exports. validateChangeName = [
    check('firstName')
    .exists().bail().withMessage(ERROR_MESSAGE.REQUIRED)
    .notEmpty().bail().withMessage(ERROR_MESSAGE.NOT_EMPTY),
    check('lastName')
    .exists().bail().withMessage(ERROR_MESSAGE.REQUIRED)
    .notEmpty().bail().withMessage(ERROR_MESSAGE.NOT_EMPTY),
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