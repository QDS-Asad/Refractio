const jwt = require("jsonwebtoken");
const { errorResp } = require("../helpers/error_helper");
const {
  HTTP_STATUS,
  ERROR_MESSAGE,
  JWT_KEY,
  USER_STATUS,
} = require("../lib/constants");
const UserService = require("../services/user.service");

module.exports = async function (req, res, next) {
  // Get token from header
  const token =
    req.header("authorization") && req.header("authorization").split(" ")[1];
  // Check if not token
  if (!token) {
    return errorResp(res, {
      code: HTTP_STATUS.UNAUTHORIZED.CODE,
      msg: ERROR_MESSAGE.UNAUTHORIZED,
    });
  }
  // Verify token
  try {
    // verify jwt signature
    const decoded = await jwt.verify(token, JWT_KEY);
    await UserService.getUserById(decoded._id).then((userRes) => {
      if (userRes.canLogin) {
        req.body.user = {
          ...decoded,
        };
        next();
      } else {
        return errorResp(res, {
          code: HTTP_STATUS.UNAUTHORIZED.CODE,
          msg: ERROR_MESSAGE.UNAUTHORIZED,
        });
      }
    });
  } catch (err) {
    return errorResp(res, {
      code: HTTP_STATUS.UNAUTHORIZED.CODE,
      msg: ERROR_MESSAGE.UNAUTHORIZED,
    });
  }
};
