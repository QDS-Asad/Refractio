const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { OPPORTUNITY_STATUS } = require("../lib/constants");
const Schema = mongoose.Schema;

const OpportunityEvaluationSchema = new Schema(
  {
    opportunityId: {
      type: String,
    },
    opportunityResponseId: {
      type: String,
    },
    teamId: {
      type: String,
    },
    userId: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        OPPORTUNITY_STATUS.PUBLISH,
        OPPORTUNITY_STATUS.DRAFT,
        OPPORTUNITY_STATUS.DISABLED,
      ],
      default: OPPORTUNITY_STATUS.DRAFT,
    },
    comprehension: {
      score: {
        type: String,
      },
    },
    qualityOfIdea: {
      score: {
        type: String,
      },
    },
    // createdBy: {
    //   type: String,
    // },
    // updatedBy: {
    //   type: String,
    //   defalut: "",
    // },
  },
  { timestamps: true }
);

OpportunityEvaluationSchema.plugin(mongoosePaginate);
module.exports = {
  OpportunityEvaluation: mongoose.model(
    "OpportunityEvaluation",
    OpportunityEvaluationSchema
  ),
};
