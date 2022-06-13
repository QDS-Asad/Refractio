const { User } = require("../models/users");
const { ObjectId } = require('mongodb');
const { sendEmail } = require("../helpers/email_helper");
const { SUCCESS_MESSAGE } = require("../lib/constants");
const { crypto_decrypt } = require("../helpers/encryption_helper");
// const nodemailer = require('nodemailer');

exports.getUserByEmail = async (email) => {
   return await User.findOne({
      email: email
   })
}

exports.getUserById = async (userId) => {
   return await User.findOne({
      _id: ObjectId(userId)
   })
}

exports.getUserByRoleId = async (roleId) => {
   return await User.findOne({roleId})
}

exports.getUserByToken = async (token) => {
   return await User.findOne({
      token: token
   })
}

exports.updateUserById = async (userId, user) => {
   return await User.findOneAndUpdate({
      _id: ObjectId(userId)
   }, user)
}

exports.deleteUserByRoleId = async (roleId) => {
   return await User.deleteOne({roleId})
}

exports.register = async (user) => {
   return await User.create(user)
}

exports.login = async (user) => {
   return await User.findOne({
      email: user.email
   });
}

exports.tokenVerificationEmail = async ({ email, html }) => {
   return await sendEmail({ email, subject: SUCCESS_MESSAGE.VERIFY_EMAIL_SUBJECT, html })
}