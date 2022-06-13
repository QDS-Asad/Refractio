const RoleService = require('../services/role.service');
module.exports = {
  async up(db, client) {
    const roles = await RoleService.getRoles();
    if (!roles.length) {
      const defaultRoles = [
        {roleId: 1, key: 'super_admin', name: "Super Admin"},
        {roleId: 2, key: 'administrator', name: "Administrator"},
        {roleId: 3, key: 'organizer', name: "Organizer"},
        {roleId: 4, key: 'participant', name: "Participant"},
     ]
      await RoleService.createDefaultRoles(defaultRoles);
    }
  },

  async down(db, client) {
    db.collection('roles').deleteMany({});
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
