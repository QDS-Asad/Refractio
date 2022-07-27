const mongoose = require("mongoose");
const { TEAM_STATUS } = require("../lib/constants");
const Schema = mongoose.Schema;

const TeamSchema = new Schema(
  {
    name: {
      type: String,
    },
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
        }
      },
    ],
    status: {
      type: String,
      enum: [
        TEAM_STATUS.ACTIVE,
        TEAM_STATUS.DISABLED
      ],
      default: TEAM_STATUS.ACTIVE,
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
