const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlanSchema = new Schema(
  {
    planId: {
      type: String,
      required: true,
    },
    prices: [],
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

PlanSchema.pre("save", function (next) {
  this.set("createdBy", "createdby");
  next();
});

PlanSchema.pre("findOneAndUpdate", function (next) {
  this.set("updatedBy", "updatedBy");
  next();
});

module.exports = {
  Plan: mongoose.model("plans", PlanSchema),
};
