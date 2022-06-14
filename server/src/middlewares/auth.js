const jwt = require("jsonwebtoken");
const { errorResp, serverError } = require("../helpers/error_helper");
const { HTTP_STATUS, ERROR_MESSAGE, JWT_KEY } = require("../lib/constants");


module.exports = async function (req, res, next) {
  // Get token from header
  const token = req.header("authorization")?.split(' ')[1];
  // Check if not token
  if (!token) {
    return errorResp(res, {code: HTTP_STATUS.UNAUTHORIZED.CODE, msg: ERROR_MESSAGE.UNAUTHORIZED})
  }
  // Verify token
    try {
      // verify jwt signature
      const decoded = await jwt.verify(token, JWT_KEY);
      req.body.user = {
        ...decoded
      };
      next();
    } catch (err) {
        return errorResp(res, {code: HTTP_STATUS.UNAUTHORIZED.CODE, msg: ERROR_MESSAGE.UNAUTHORIZED.CODE})
    }
};