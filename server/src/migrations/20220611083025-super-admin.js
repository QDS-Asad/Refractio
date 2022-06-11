const UserService = require('../services/user.service');
const RoleService = require('../services/role.service');
const { crypto_encrypt } = require('../helpers/encryption_helper');
const { ROLES, ERROR_MESSAGE, USER_STATUS } = require('../lib/constants');
module.exports = {
  async up(db, client) {
    try {
      const role = await RoleService.getRoleByRoleId(ROLES.SUPER_ADMIN);
      const superAdmin = await UserService.getUserByRoleId(role._id);
      if (!superAdmin) {
        const adminData = {
          roleId: role._id,
          fullName: role.name,
          email: "admin@gmail.com",
          password: crypto_encrypt("admin123"),
          status: USER_STATUS.ACTIVE,
          isVerified: true,
          canLogin: true,
        };
        await UserService.register(adminData);
      }else{
        console.log(ERROR_MESSAGE.SUPER_ADMIN_EXIST);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async down(db, client) {
    const role = await RoleService.getRoleByRoleId(ROLES.SUPER_ADMIN);
    await UserService.deleteUserByRoleId(role._id);
  }
};
