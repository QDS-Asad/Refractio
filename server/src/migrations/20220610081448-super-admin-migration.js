const UserService = require('../services/user.service');
const RoleService = require('../services/role.service');
const { crypto_encrypt } = require('../helpers/encryption_helper');
const { ROLES } = require('../lib/constants');
module.exports = {
  async up(db, client) {
    console.log('up');
    try {
      const role = await RoleService.getRoleByRoleId(ROLES.SUPER_ADMIN_PASSWORD);
      console.log(role);
      const superAdmin = await UserService.getUserByRoleId(role._id);
      if (!superAdmin.length) {
        const adminData = {
          role,
          fullName: role.name,
          email: SUPER_ADMIN_EMAIL,
          password: crypto_encrypt(SUPER_ADMIN_PASSWORD),
          isVerified: true,
          canLogin: true,
        };
        await UserService.register(adminData);
      }
    } catch (error) {
      console.log(error);
    }
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});

  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
