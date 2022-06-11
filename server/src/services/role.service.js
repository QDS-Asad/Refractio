const{ Role } = require("../models/roles");

exports.createDefaultRoles = async () => {
   return Role.create([
      {roleId: 1, key: 'super_admin', name: "Super Admin"},
      {roleId: 2, key: 'administrator', name: "Administrator"},
      {roleId: 3, key: 'organizer', name: "Organizer"},
      {roleId: 4, key: 'participant', name: "Participant"},
   ])
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

