const User = require("../models/user").User
const UserOTPVerification = require("../models/userOtpVerification").UserOTPVerification;
const UserToken = require("../models/userToken").UserToken;


exports.signUp = async(fullName, email, password)=>{
   let user = await User.findOne({
      email:email
   })
   if(user){
      res.send({
         message:"user email already exists"
      })
   }
   return await User.create({
      fullName,
      email,
      password
   })
}

exports.login = async(email, password)=>{
   let user = await User.findOne({
      email:email
   });
   return user;
}

exports.userOtpVerification = async(id, otp, createdAt, expiresAt)=>{
   return await UserOTPVerification.create({
      id,
      otp,
      createdAt,
      expiresAt
   })
}

exports.verfiyOtp = async(userId, otp)=>{
   let userOtp = await UserOTPVerification.findOne({
      id:userId
   });
   return userOtp;
}

exports.deleteExpiredOtp = async(userId)=>{
   let userOtp = await UserOTPVerification.deleteMany({
      id:userId
   });
   return userOtp;
}

exports.getUserByEmail = async(email)=>{
   return await User.findOne({
      email:email
   })
}

exports.getUserById = async(userId)=>{
   return await User.findOne({
      id:userId
   })
}

exports.userToken = async(userid, token, createdAt, expiresAt)=>{
   return await UserToken.create({
      userId:userid,
      token:token,
      createdAt:createdAt,
      expiresAt:expiresAt
   })
}

exports.getUserByToken = async(token)=>{
   return await UserToken.findOne({
      token:token
   })
}

exports.modifyUserPassword = async(userid, password)=>{
  let result =  await User.findByIdAndUpdate(userid,{password});
  return result;  
}