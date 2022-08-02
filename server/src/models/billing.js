const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const BillingSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    teamId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
BillingSchema.plugin(mongoosePaginate);
module.exports = {
  Billing: mongoose.model("billing", BillingSchema),
};
