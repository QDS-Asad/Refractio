const mongoose = require("mongoose");
const { USER_STATUS, SUBSCRIPTION_STATUS } = require("../lib/constants");
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    // roleId: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    // },
    fullName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: "",
    },
    token: {
      type: String,
      default: "",
    },
    tokenExpiry: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    canLogin: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    isSuperAdmin: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    // status: {
    //   type: String,
    //   enum: [
    //     USER_STATUS.ACTIVE,
    //     USER_STATUS.INVITE_SENT,
    //     USER_STATUS.SUBSCRIPTION_PENDING,
    //     USER_STATUS.DISABLED,
    //   ],
    //   default: USER_STATUS.DISABLED,
    // },
    // teamId: {
    //   type: Schema.Types.ObjectId,
    // },
    isRegistered: {
      type: Boolean,
      default: false,
    },
    teams: [
      {
        teamId: {
          type: Schema.Types.ObjectId,
        },
        roleId: {
          type: Schema.Types.ObjectId,
        },
        status: {
          type: String,
          enum: [
            USER_STATUS.ACTIVE,
            USER_STATUS.INVITE_SENT,
            USER_STATUS.SUBSCRIPTION_PENDING,
            USER_STATUS.DISABLED,
          ],
          default: USER_STATUS.DISABLED,
        },
        stripeDetails: {
          paymentMethod: {
            paymentMethodId: {
              type: String,
              default: "",
            },
            nameOnCard: {
              type: String,
            },
            type: {
              type: String,
              default: "",
            },
            brand: {
              type: String,
              default: "",
            },
            expMonth: {
              type: String,
              default: "",
            },
            expYear: {
              type: String,
              default: "",
            },
            last4Digits: {
              type: String,
              default: "",
            },
          },
          subscription: {
            subscriptionId: {
              type: String,
              default: "",
            },
            planId: {
              type: String,
              default: "",
            },
            priceId: {
              type: String,
              default: "",
            },
            startDate: {
              type: String,
              default: "",
            },
            endDate: {
              type: String,
              default: "",
            },
            canceledDate: {
              type: String,
              default: "",
            },
            status: {
              type: String,
              enum: [SUBSCRIPTION_STATUS.SUCCESS, SUBSCRIPTION_STATUS.FAILED],
            },
            autoRenew: {
              type: Boolean,
              enum: [true, false],
              default: false,
            },
          },
        },
        
      },
    ],
    customerId: {
      type: String,
      default: "",
    },
    createdBy: {
      type: String,
    },
    updatedBy: {
      type: String,
      defalut: "",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  this.set("createdBy", "createdby");
  next();
});

UserSchema.pre("findOneAndUpdate", function (next) {
  this.set("updatedBy", "updatedBy");
  next();
});
UserSchema.plugin(mongoosePaginate);
module.exports = {
  User: mongoose.model("users", UserSchema),
};
