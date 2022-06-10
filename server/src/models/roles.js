var mongoose = require("mongoose");

const RolesSchema = new mongoose.Schema({
    roleId: {
        type: Number,
        default: 1
    },
    key: {
        type: String,
        default: "super_admin"
    },
    name: {
        type: String,
        default: "Super Admin"
    }
});

module.exports = {
    Role: mongoose.model('roles', RolesSchema)
}











