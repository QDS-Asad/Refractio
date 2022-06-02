const express = require('express');
const router = express.Router();
const generalRegister = require('../middlewares/generalRegister').validateGeneralUserRegisterInput;
const generalLogin = require('../middlewares/generalLogin').validateGeneralUserLoginInput;
const generalResetPassword = require('../middlewares/generalResetPassword').validateGeneralUserResetPasswordInput;


const UserController = require('../controllers/user.controller')
const verifyToken = require('../middlewares/verifyToken');

const metaData = require('../models/projectmetadata').MetaData;

router.post('/api/register',generalRegister,UserController.register);
router.post('/api/login',UserController.login);
router.post('/api/verify-login',UserController.verifyOtp);
router.post('/api/forget-password',UserController.forgetPassword);
router.post('/api/reset-password/:token',generalResetPassword,UserController.resetPassword)
//router.get('/api/test',verifyToken,(req, res)=>{res.send({message:"Token verfied successfully."})})

//seeding project meta-data
router.post('/api/meta-data',async(req, res)=>{
    let projectMetaData = await metaData.create({
        roles:[
            {
                role:"Participant",
                key:"participant",
            },
            {
                role:"Organiser",
                key:"organiser"
            },
            {
                role:"Administrator",
                key:"administrator"   
            }
        ]
    });
    res.status(200).send({
        status:"Success",
       projectMetaData
    })
})



module.exports = router;