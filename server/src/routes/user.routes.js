const express = require('express');
const router = express.Router();
const generalRegister = require('../middlewares/generalRegister').validateGeneralUserRegisterInput;
const generalLogin = require('../middlewares/generalLogin').validateGeneralUserLoginInput;
const generalResetPassword = require('../middlewares/generalResetPassword').validateGeneralUserResetPasswordInput;


const UserController = require('../controllers/user.controller')
const verifyToken = require('../middlewares/verifyToken');

const metaData = require('../models/projectmetadata').MetaData;

router.post('/register',generalRegister,UserController.register);
router.post('/login',UserController.login);
router.post('/verify-login',UserController.verifyOtp);
router.post('/forget-password',UserController.forgetPassword);
router.post('/reset-password/:token',generalResetPassword,UserController.resetPassword)
//router.get('/api/test',verifyToken,(req, res)=>{res.send({message:"Token verfied successfully."})})

//seeding project meta-data
router.post('/meta-data',async(req, res)=>{
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