const { Opportunity } = require("../models/opportunity");
const { OpportunityResponse } = require("../models/opportunityResponses");
const { ObjectId } = require("mongodb");
const { OPPORTUNITY_STATUS } = require("../lib/constants");
const { OpportunityEvaluation } = require("../models/opportunityEvaluation");

exports.getOpportunitiesByUser = async (user) => {
  return await Opportunity.find({
    $or: [
      { createdById: user._id },
      { participants: { $in: [ObjectId(user._id)] } },
    ],
    teamId: user.teamId,
    // participants: { $in: [ObjectId(user._id)] },
    status: { $nin: OPPORTUNITY_STATUS.DISABLED },
  });
};

exports.getOpportunitiesByUserAsParticipant = async (user) => {
  return await Opportunity.find({
    participants: { $in: [ObjectId(user._id)] },
    teamId: user.teamId,
    status: user.status,
  });
};

exports.getOpportunitiesByUserAsOwner = async (user) => {
  return await Opportunity.find({
    createdById: user._id,
    teamId: user.teamId,
    status: user.status,
  });
};

exports.getOpportunityById = async (id) => {
  return await Opportunity.findOne({ _id: ObjectId(id) });
};

exports.getOpportunityResponseByIdUserId = async (opportunityId, userId) => {
  return await OpportunityResponse.findOne({ opportunityId, userId });
};

exports.getOpportunityEvaluateByIdUserId = async (
  opportunityResponseId,
  userId
) => {
  return await OpportunityEvaluation.findOne({ opportunityResponseId, userId });
};

exports.getOpportunityResponseById = async (id) => {
  return await OpportunityResponse.findOne({ _id: ObjectId(id) });
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
  return await OpportunityResponse.create(obj);
};

exports.updateAnswerOpportunity = async (id, obj) => {
  return await OpportunityResponse.findOneAndUpdate(
    {
      _id: ObjectId(id),
    },
    obj
  );
};

exports.evaluateOpportunity = async (obj) => {
  return await OpportunityEvaluation.create(obj);
};

exports.updateEvaluateOpportunity = async (id, obj) => {
  return await OpportunityEvaluation.findOneAndUpdate(
    {
      _id: ObjectId(id),
    },
    obj
  );
};

exports.updateOpportunityEvaluationsByResponseIdUserId = async (
  id,
  userId,
  obj
) => {
  return await OpportunityEvaluation.updateMany(
    {
      opportunityId: ObjectId(id),
      userId: ObjectId(userId),
    },
    obj
  );
};

exports.getOpportunityResponsesByOpportunityId = async (id) => {
  return await OpportunityResponse.find({
    opportunityId: id,
    status: OPPORTUNITY_STATUS.PUBLISH,
  });
};

exports.getOpportunityEvaluationByResponseId = async (id) => {
  return await OpportunityEvaluation.find({
    opportunityResponseId: ObjectId(id),
    status: OPPORTUNITY_STATUS.PUBLISH,
  });
};

exports.getOpportunityEvaluationsByOpportunityId = async (id) => {
  return await OpportunityEvaluation.find({
    opportunityId: id,
    status: OPPORTUNITY_STATUS.PUBLISH,
  });
};

exports.getOpportunityEvaluationByResponseIdUserId = async (
  opportunityResponseId,
  userId
) => {
  return await OpportunityEvaluation.findOne({
    opportunityResponseId,
    userId,
  });
};
