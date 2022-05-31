const express = require('express');
const router = express.Router();
const generalRegister = require('../middlewares/generalRegister').validateGeneralUserRegisterInput;
const generalLogin = require('../middlewares/generalLogin').validateGeneralUserLoginInput;



const UserController = require('../controllers/user.controller')
const verifyToken = require('../middlewares/verifyToken');

router.post('/register',generalRegister,UserController.register);
router.post('/login',generalLogin,UserController.login);
router.post('/verify-login',UserController.verifyOtp);
//router.get('/api/test',verifyToken,(req, res)=>{res.send({message:"Token verfied successfully."})})


module.exports = router;