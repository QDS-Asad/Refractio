const UserService = require('../services/user.service');
const RoleService = require('../services/role.service');
const { crypto_encrypt } = require('../helpers/encryption_helper');
const { ROLES, ERROR_MESSAGE, USER_STATUS } = require('../lib/constants');
module.exports = {
  async up(db, client) {
    try {
      const role = await RoleService.getRoleByRoleId(ROLES.SUPER_ADMIN);
      const password = "Qwe123@@@";
        const adminData = {
          roleId: role._id,
          firstName: "Refractio",
          lastName: "Super Admin",
          email: "refractio@yopmail.com",
          password: crypto_encrypt(password),
          status: USER_STATUS.ACTIVE,
          isVerified: true,
          canLogin: true,
          isSuperAdmin: true,
        };
        await UserService.register(adminData);
    } catch (error) {
      console.log(error);
    }
  },

  async down(db, client) {
    const role = await RoleService.getRoleByRoleId(ROLES.SUPER_ADMIN);
    await UserService.deleteUserByRoleId(role._id);
  }
};
