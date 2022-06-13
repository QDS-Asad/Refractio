const { HTTP_STATUS } = require('../lib/constants');
// send success response
exports.successResp = (res, args) => {
    let { msg, code, data } = args;
    // renaming `data` key inside data variable
    if (data && data.hasOwnProperty('data')) {
        data = { ...data, info: data.data };
        delete data.data;
    }
    return res.status(HTTP_STATUS.SUCCESS.CODE).send({
        success: true,
        code: code || HTTP_STATUS.SUCCESS.CODE,
        message: msg,
        data: data || {},
    });
};
// send error response
exports.errorResp = (res, args = {}) => {
    console.log(args);
    const { msg, code } = args;
    return res.status(HTTP_STATUS.BAD_REQUEST.CODE).send({
        success: false,
        code: code || HTTP_STATUS.BAD_REQUEST.CODE,
        message: msg || HTTP_STATUS.BAD_REQUEST.TEXT,
    });
};

// send error response
exports.serverError = (res, err = null) => {
    return res.status(HTTP_STATUS.INTERNAL_SERVER.CODE).json({
        success: false,
        code: HTTP_STATUS.INTERNAL_SERVER.CODE,
        message: err?.message || HTTP_STATUS.INTERNAL_SERVER.TEXT,
    });
};