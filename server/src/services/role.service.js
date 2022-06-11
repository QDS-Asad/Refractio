const{ Role } = require("../models/roles");

exports.createDefaultRoles = async (roles) => {
   return Role.create(roles)
}

exports.getRoles = () =>{
   return Role.find({roleId: {$nin: 1}});
}

exports.getRoleById = (id) =>{
   return Role.findOne({_id: id});
}

exports.getRoleByRoleId = (roleId) =>{
   return Role.findOne({roleId});
}

exports.deleteDefaultRoles = () =>{
   return Role.deleteMany({});
}

