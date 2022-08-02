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

module.exports = {
  Plan: mongoose.model("plans", PlanSchema),
};
