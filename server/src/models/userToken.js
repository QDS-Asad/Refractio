const mongoose = require ('mongoose');

var UserTokenSchema = new mongoose.Schema({
    userId: String,
    token: String,
    createdAt: Date,
    expiresAt: Date 
  });
  
  var UserToken = mongoose.model('UserToken',UserTokenSchema );
  
  module.exports = {
    UserToken: UserToken
  }