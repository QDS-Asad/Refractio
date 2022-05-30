const express = require('express');
const router = express.Router();
const generalRegister = require('../middlewares/generalRegister').validateGeneralUserRegisterInput;
const generalLogin = require('../middlewares/generalLogin').validateGeneralUserLoginInput;



const UserController = require('../controllers/user.controller')
const verifyToken = require('../middlewares/verifyToken');

router.post('/api/register',generalRegister,UserController.register);
router.post('/api/login',generalLogin,UserController.login);
router.post('/api/verify-login',UserController.verifyOtp);
//router.get('/api/test',verifyToken,(req, res)=>{res.send({message:"Token verfied successfully."})})


module.exports = router;