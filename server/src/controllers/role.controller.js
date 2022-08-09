const {
  successResp,
  errorResp,
  serverError,
} = require('../helpers/error_helper');
const {
  HTTP_STATUS,
  ROLES,
} = require('../lib/constants');
const RoleService = require('../services/role.service');

// get all roles except super admin
exports.getRoles = async (req, res) => {
  try {
    const { user } = req.body;
    const role = await RoleService.getRoleById(user.roleId);
    let filter;
    if (role.roleId === ROLES.ORGANIZER) {
      filter = { $nin: [1, 2] };
    } else {
      filter = { $nin: 1 };
    }
    const roles = await RoleService.getRoles(filter);
    if (roles) {
      return successResp(res, { code: HTTP_STATUS.SUCCESS.CODE, data: roles });
    } else {
      return errorResp(res, { code: HTTP_STATUS.BAD_REQUEST.CODE });
    }
  } catch (error) {
    serverError(res, error);
  }
};
