const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillingSchema = new Schema(
  {
    userId: {
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

BillingSchema.pre("save", function (next) {
  this.set("createdBy", "createdby");
  next();
});

BillingSchema.pre("findOneAndUpdate", function (next) {
  this.set("updatedBy", "updatedBy");
  next();
});

module.exports = {
  Billing: mongoose.model("billing", BillingSchema),
};
