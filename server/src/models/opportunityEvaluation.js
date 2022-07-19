const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { OPPORTUNITY_STATUS } = require("../lib/constants");
const Schema = mongoose.Schema;

const OpportunityEvaluationSchema = new Schema(
  {
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
        OPPORTUNITY_STATUS.ANSWERING,
        OPPORTUNITY_STATUS.COMPLETED,
        OPPORTUNITY_STATUS.DISABLED,
      ],
      default: OPPORTUNITY_STATUS.DRAFT,
    },
    comprehension: {
      evaluation: [
        {
          userId: {
            type: String,
          },
          score: {
            type: String,
          },
        },
      ],
    },
    qualityOfIdea: {
      evaluation: [
        {
          userId: {
            type: String,
          },
          score: {
            type: String,
          },
        },
      ],
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

OpportunityEvaluationSchema.pre("save", function (next) {
  this.set("createdBy", "createdby");
  next();
});

OpportunityEvaluationSchema.pre("findOneAndUpdate", function (next) {
  this.set("updatedBy", "updatedBy");
  next();
});
OpportunityEvaluationSchema.plugin(mongoosePaginate);
module.exports = {
  OpportunityEvaluation: mongoose.model("OpportunityEvaluation", OpportunityEvaluationSchema),
};
