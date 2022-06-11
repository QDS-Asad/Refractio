const { successResp, errorResp, serverError } = require('../helpers/error_helper');
const { SUCCESS_MESSAGE, HTTP_STATUS, ERROR_MESSAGE } = require('../lib/constants');
const RoleService = require('../services/role.service');

// create roles by default
exports.createDefaultRoles = async (req, res) => {
  try {
    const roles = await RoleService.getRoles();
    if (!roles.length) {
      const createdRoles = await RoleService.createDefaultRoles();
      if (createdRoles) {
        return successResp(res, { msg: SUCCESS_MESSAGE.DEFAULT_ROLES, code: HTTP_STATUS.SUCCESS.CODE })
      }else{
        return errorResp(res, { msg: ERROR_MESSAGE.DEFAULT_ROLES_FAILED, code: HTTP_STATUS.BAD_REQUEST.CODE })
      }
    }else{
      return errorResp(res, { msg: ERROR_MESSAGE.DEFAULT_ROLES_EXIST, code: HTTP_STATUS.BAD_REQUEST.CODE })
    }

  } catch (error) {
    serverError(res, error);
  }
}

// get all roles except super admin
exports.getRoles = async (req, res) => {
  try {
    const roles = await RoleService.getRoles();
      if (roles) {
        return successResp(res, { code: HTTP_STATUS.SUCCESS.CODE, data: roles})
      }else{
        return errorResp(res, { code: HTTP_STATUS.BAD_REQUEST.CODE })
      }
  } catch (error) {
    serverError(res, error);
  }
}