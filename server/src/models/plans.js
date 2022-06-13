const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlanSchema = new Schema({
    planId: {
        type: String,
        required: true,
    },
    monthlyPriceId: {
        type: String,
        required: true,
    },
    yearlyPriceId: {
        type: String,
        required: true,

    }

}, { timestamps: true });

// const PlanSchema = new Schema({
//     plan: {
//         id: {
//             type: String,
//             required: true,
//         },
//         name: {
//             type: String,
//             required: true,
//         },
//         description: {
//             type: String,
//             required: true,
//         },
//         tax_code: {
//             type: String,
//         },
//         active: {
//             type: Boolean,
//             required: true,
//         }
//     },
//     monthlyPrice: {
//         id: {
//             type: String,
//             required: true,
//         },
//         product: {
//             type: String,
//             required: true,
//         },
//         currency: {
//             type: String,
//             required: true,
//         },
//         type: {
//             type: String,
//             required: true,
//         },
//         recurring: {
//             type: Object,
//             required: true,
//         },
//         tax_behavior: {
//             type: String,
//             required: true,
//         },
//         unit_amount: {
//             type: String,
//             required: true,
//         },
//         unit_amount_decimal: {
//             type: String,
//             required: true,
//         },
//     },
//     yearlyPrice: {
//         id: {
//             type: String,
//             required: true,
//         },
//         product: {
//             type: String,
//             required: true,
//         },
//         currency: {
//             type: String,
//             required: true,
//         },
//         type: {
//             type: String,
//             required: true,
//         },
//         recurring: {
//             type: Object,
//             required: true,
//         },
//         tax_behavior: {
//             type: String,
//             required: true,
//         },
//         unit_amount: {
//             type: String,
//             required: true,
//         },
//         unit_amount_decimal: {
//             type: String,
//             required: true,
//         },
//     }

// }, { timestamps: true });

PlanSchema.pre('save', function (next) {
    this.set('createdBy', 'createdby');
    next();
});

PlanSchema.pre('findOneAndUpdate', function (next) {
    this.set('updatedBy', 'updatedBy');
    next();
});

module.exports = {
    Plan: mongoose.model('plans', PlanSchema)
}