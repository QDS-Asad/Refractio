var mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

var UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    //required: true,
    
  },
  lastName:{
    type: String,
    //required: true,
  },
  fullName:{
    type: String,
    required: true,
  },
  email:{
      type:String,
      required: true,
      lowercase:true,
      unique: true
  },
  password:{
      type: String,
      required: true
  },
  verified:{
      type: Boolean,
      required: true,
      default:false
  },
  roles:{
      type:Array,
      default:[{role:"Participant",key:"participant"}]
},
  subscriptions:[
      {
        subscriptionType:{
            type: String
        },
        subscriptionStartDate:{
            type: Date
        },
        subscriptionExprDate:{
            type: Date
        },
        isAutoRenewal:{
            type: Boolean
        },
        isCurrentSubscription:{
            type: Boolean
        },
        istaxable:{
            type: Boolean
        }
      }
  ],
  paymentDetails:[
      {
        paymentType:{
            type: String
        },
        paymentAmount:{
            type:Number
        },
        paymentCurrency:{
            type: String
        },
        paymentDate:{
            type: Date
        },
        paymentTime:{
            type: Date
        },
        paymentStatus:{
            type: String
        },
        transactionId:{
            type: Number
        }
      }
  ],
  stripeCustomerId:{
      type: Number
  },
  createdAt:{
      type: Date
  },
  updatedAt:{
      type: Date
  },
  isDeleted:{
      type: Boolean
  },
  isActive:{
      type: Boolean
  },
  deletedAt:{
      type: Date
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
  User: User
}