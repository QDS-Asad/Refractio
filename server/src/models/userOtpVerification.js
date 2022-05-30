const mongoose = require ('mongoose');

var UserOTPVerificationSchema = new mongoose.Schema({
    userId: String,
    otp:String,
    createdAt: Date,
    expiresAt: Date 
  });
  
  var UserOTPVerification = mongoose.model('UserOTPVerification',UserOTPVerificationSchema );
  
  module.exports = {
    UserOTPVerification: UserOTPVerification
  }