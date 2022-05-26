const { ObjectId } = require("mongodb");
var mongoose = require("mongoose");

var AuthSchema = new mongoose.Schema({
  userId:{
      type:ObjectId
  },
  isNewUser:{
      type: Boolean
  },
  requestTime:{
      type: Date
  },
  verificationCode:{
      type: Number
  },
  expiredTime:{
      type: Number
  },
  status:{
      type: String
  },
  loginTime:{
      type: Date
  },
  registrationTime:{
      type: Date
  }
});

var Auth = mongoose.model('Auth', AuthSchema);

module.exports = {
  Auth: Auth
}