const User = require("../models/user").User

exports.signUp = async(fullName, email, password)=>{
   // let user = await User.findOne({
   //    email:email
   // })
   // if(user){
   //    res.send({
   //       message:"user email already exists"
   //    })
   // }
   // console.log("service user",user);
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