const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { OPPORTUNITY_STATUS } = require("../lib/constants");
const Schema = mongoose.Schema;

const OpportunityResponseSchema = new Schema(
  {
    opportunityId: {
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
      answers: [
        {
          questionId: {
            type: String,
          },
          answer: {
            type: String,
          },
        },
      ],
    },
    qualityOfIdea: {
      answers: [
        {
          questionId: {
            type: String,
          },
          answer: {
            type: String,
          },
        },
      ],
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
OpportunityResponseSchema.plugin(mongoosePaginate);
module.exports = {
  OpportunityResponse: mongoose.model("OpportunityResponses", OpportunityResponseSchema),
};
