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
  },
  { timestamps: true }
);
module.exports = {
  Team: mongoose.model("teams", TeamSchema),
};
