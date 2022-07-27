const { Role } = require('../models/roles');

exports.createDefaultRoles = async (roles) => {
  return Role.create(roles);
};

exports.getRoles = (filter) => {
  return Role.find({ roleId: filter }).sort('roleId');
};

exports.getRoleById = (id) => {
  return Role.findOne({ _id: id });
};

exports.getRoleByRoleId = (roleId) => {
  return Role.findOne({ roleId });
};

exports.getRolesByRoleIds = (roleIds) => {
  return Role.find({ roleId: {$nin: roleIds} }).select({ _id: 1 });
};

exports.deleteDefaultRoles = () => {
  return Role.deleteMany({});
};
