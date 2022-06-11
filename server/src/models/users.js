const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    role: {
        _id:{
            type: Schema.Types.ObjectId
        },
        roleId: {
            type: Number
        },
        key: {
            type: String
        },
        name:{
            type: String
        }
    },
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        default: ''
    },
    token: {
        type: String,
        default: ''
    },
    tokenExpiry: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    canLogin: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    status: {
        type: String,
        enum: ['active', 'invite_sent', 'verification_pending', 'subscription_pending', 'disabled'],
        default: 'subscription_pending'
    },
    teamIds: [
        {
            teamId: {
                type: Schema.Types.ObjectId,
            }
        }
    ],
    nameOnCard: {
        type: String
    },
    stripeDetails: {
        paymentMethod: {
            paymentMethodId: {
                type: String,
                default:''
            },
            type: {
                type: String,
                default: ''
            },
            brand: {
                type: String,
                default: ''
            },
            expMonth: {
                type: String,
                default: ''
            },
            expYear: {
                type: String,
                default: ''
            },
            last4Digits: {
                type: String,
                default: ''
            },
        },
        customerId: {
            type: String,
            default: ''
        },
        subscription: {
            subscriptionId: {
                type: String,
                default: ''
            },
            planId: {
                type: String,
                default: ''
            },
            priceId: {
                type: String,
                default: ''
            },
            startDate: {
                type: String,
                default: ''
            },
            endDate: {
                type: String,
                default: ''
            },
            status: {
                type: String,
                enum: ['success', 'failed', ''],
                default: ''
            },
        }
    },
    autoRenew: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    createdBy: {
        type: String
    },
    updatedBy: {
        type: String,
        defalut: ''
    }
}, { timestamps: true });

UserSchema.pre('save', function (next) {
    this.set('createdBy', 'createdby');
    next();
});

UserSchema.pre('findOneAndUpdate', function (next) {
    this.set('updatedBy', 'updatedBy');
    next();
});

module.exports = {
    User: mongoose.model('users', UserSchema)
}