var mongoose = require("mongoose");

const RolesSchema = new mongoose.Schema({
    roleId: {
        type: Number,
    },
    key: {
        type: String,
    },
    name: {
        type: String,
    }
});

module.exports = {
    Role: mongoose.model('roles', RolesSchema)
}











