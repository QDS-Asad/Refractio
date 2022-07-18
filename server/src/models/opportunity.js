const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const { OPPORTUNITY_STATUS } = require("../lib/constants");
const Schema = mongoose.Schema;

const OpportunitySchema = new Schema(
  {
    teamId: {
      type: String,
    },
    createdById: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
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
        questions: [
            {
				question: {
                    type: String,
                    default: "",
                },
				order : {
                    type: String,
                    default: "",
                }
			}
        ]  
    },
    qualityOfIdea: {
        questions: [
            {
				question: {
                    type: String,
                    default: "",
                },
				order : {
                    type: String,
                    default: "",
                }
			}
        ]  
    },
    participants: [String],
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

OpportunitySchema.pre("save", function (next) {
  this.set("createdBy", "createdby");
  next();
});

OpportunitySchema.pre("findOneAndUpdate", function (next) {
  this.set("updatedBy", "updatedBy");
  next();
});
OpportunitySchema.plugin(mongoosePaginate);
module.exports = {
  Opportunity: mongoose.model("Opportunities", OpportunitySchema),
};
