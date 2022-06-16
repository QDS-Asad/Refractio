const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema(
  {
    createdById: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    members: [
      {
        userId: {
          type: Schema.Types.ObjectId,
        },
        roleId: {
          type: Number,
        },
      },
    ],
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

TeamSchema.pre("save", function (next) {
  this.set("createdBy", "createdby");
  next();
});

TeamSchema.pre("findOneAndUpdate", function (next) {
  this.set("updatedBy", "updatedBy");
  next();
});

module.exports = {
  Team: mongoose.model("teams", TeamSchema),
};
