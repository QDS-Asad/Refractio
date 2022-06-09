const express = require('express');
const router = express.Router();
const generalRegister =
  require('../middlewares/generalRegister').validateGeneralUserRegisterInput;
const generalLogin =
  require('../middlewares/generalLogin').validateGeneralUserLoginInput;
const generalResetPassword =
  require('../middlewares/generalResetPassword').validateGeneralUserResetPasswordInput;

const UserController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');

const metaData = require('../models/projectmetadata').MetaData;

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/verify-login', UserController.verifyOtp);
router.post('/forget-password', UserController.forgetPassword);
router.post('/reset-password/:token', UserController.resetPassword);
router.post('/resend-otp', UserController.resendOtp);
//router.get('/api/test',verifyToken,(req, res)=>{res.send({message:"Token verfied successfully."})})
router.get('/get-meta-data', UserController.getMetaData);
//seeding project meta-data
router.post('/meta-data', async (req, res) => {
  let projectMetaData = await metaData.create({
    roles: [
      {
        role: 'Participant',
        key: 'participant',
        permissions: [
          "SEND_INVITATIONS",
          "CHANGE_USER_TYPE"
      ]
      },
      {
        role: 'Organiser',
        key: 'organiser',
        permissions: [
          "SEND_INVITATIONS",
          "CHANGE_USER_TYPE"
      ]
      },
      {
        role: 'Administrator',
        key: 'administrator',
        permissions: [
          "ADD_TEAM_DETAILS",
          "EDIT_TEAM_DETAILS",
          "DELETE_TEAM_DETAILS",
          "SEND_INVITATIONS",
          "CHANGE_USER_TYPE",
          "ASSIGN_USER_TYPE"
      ]
      },
    ],
    permissions: [
      {
          "key": "VIEW_STATUS_USER_ACCOUNT",
          "value": "View End User Account Details"
      },
      {
          "key": "ADD_TEAM_DETAILS",
          "value": "Add New Team With Details"
      },
      {
          "key": "EDIT_TEAM_DETAILS",
          "value": "Edit Team Details"
      },
      {
          "key": "DELETE_TEAM_DETAILS",
          "value": "Delete Team Details"
      },
      {
          "key": "SEND_INVITATIONS",
          "value": "Send Invitation To Members"
      },
      {
          "key": "CHANGE_USER_TYPE",
          "value": "Change User Type"
      },
      {
          "key": "ASSIGN_USER_TYPE",
          "value": "Assign User Type To User"
      }
  ],
  });
  res.status(200).send({
    status: 'Success',
    projectMetaData,
  });
});

module.exports = router;
