const { Opportunity } = require("../models/opportunity");
const { ObjectId } = require('mongodb');
const { OPPORTUNITY_STATUS } = require("../lib/constants");

exports.getOpportunitiesByUser = async (user) => {
   return await Opportunity.find({
      teamId: user.teamId,
      participants: { "$in" : [ObjectId(user._id)]},
      status: { $nin: OPPORTUNITY_STATUS.DISABLED},
   })
}


exports.getOpportunityById = async (id) => {
   return await Opportunity.findOne({_id: ObjectId(id)})
}

exports.createOpportunity = async (obj) => {
   return await Opportunity.create(obj);
}

exports.updateOpportunity = async (id, obj) => {
   return await Opportunity.findOneAndUpdate({
    _id: ObjectId(id)
 }, obj);
}

exports.deleteOpportunity = async (id) => {
   return await Opportunity.findOneAndUpdate({
    _id: ObjectId(id)
 }, {status: OPPORTUNITY_STATUS.DISABLED});
}