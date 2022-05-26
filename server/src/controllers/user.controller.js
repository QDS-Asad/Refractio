const UserService = require('../services/user.service');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const generalRegisterValidation = require('../middlewares/generalRegister.middleware')
const { validationResult } = require('express-validator');

exports.register = async (req, res, next) =>{
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
    const {fullName, email, password} = req.body;
    const passwordhash = await bcrypt.hash(password, 10);
    try {
        const response = await UserService.signUp(fullName, email, passwordhash);
        return res.status(200).send({
            status:"User created successfully"
        })
        
    } catch (error) {
        return res.status(500).send({
            status:'error',
            message:"Something went wrong"
        })
    }
}

exports.login = async(req, res)=>{
    const {email, password} = req.body;
    if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      try {
          let user = await UserService.login(email, password);
          if(!user){
              res.status(200).json({
                  message:"User does not exists"
              })
          }
          if (user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign(
              {_id: user._id, email },
              process.env.TOKEN_KEY,
              {
                expiresIn: "2h",
              }
            );
            user.token = token;
            let userData ={
                id:user._id,
                fullName: user.fullName,
                email: user.email,
                token: token,
            }
              res.status(200).send(userData)
          }
          if(user && !(await bcrypt.compare(password, user.password))){
              res.status(200).json({
                  message:"Invalid Credentials"
              })
          }
      } catch (error) {
        return res.status(500).send({
            status:'error',
            message:"Something went wrong"
        })
      }
}