const { Opportunity } = require("../models/opportunity");
const { OpportunityResponse } = require("../models/opportunityResponses");
const { ObjectId } = require("mongodb");
const { OPPORTUNITY_STATUS } = require("../lib/constants");

exports.getOpportunitiesByUser = async (user) => {
  return await Opportunity.find({
    // $or: [{ createdById: user._id }, {participants: { $in: [ObjectId(user._id)] }}],
    teamId: user.teamId,
    participants: { $in: [ObjectId(user._id)] },
    status: { $nin: OPPORTUNITY_STATUS.DISABLED },
  });
};

exports.getOpportunityById = async (id) => {
  return await Opportunity.findOne({ _id: ObjectId(id) });
};

exports.createOpportunity = async (obj) => {
  return await Opportunity.create(obj);
};

exports.updateOpportunity = async (id, obj) => {
  return await Opportunity.findOneAndUpdate(
    {
      _id: ObjectId(id),
    },
    obj
  );
};

exports.deleteOpportunity = async (id) => {
  return await Opportunity.findOneAndUpdate(
    {
      _id: ObjectId(id),
    },
    { status: OPPORTUNITY_STATUS.DISABLED }
  );
};

exports.answerOpportunity = async (obj) => {
  return await OpportunityResponse.creaet(obj);
};

exports.getOpportunityResponsesByOpportunityId = async (id) => {
  return await Opportunity.find({
    OpportunityId: ObjectId(id),
  });
};
