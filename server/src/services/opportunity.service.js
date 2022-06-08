const Opportunity = require("../models/opportunity").Opportunity;


exports.createOpportunity = async(userId, name, description, questions, isPublished, isDraft)=>{
    return await Opportunity.create({
        userId:userId,
        name:name,
        description:description,
        questions:questions,
        isPublished:isPublished,
        isDraft:isDraft,
    })
 }

 exports.getOpportunity = async(userId)=>{
     return await Opportunity.find({userId:userId})
 }

 exports.modifyOpportunity = async(opportunityId, name, description, questions,isPublished, isDraft)=>{
    let result =  await Opportunity.findByIdAndUpdate(opportunityId,{name, description, questions,isPublished, isDraft});
    return result;  
  }

 exports.deleteOpportunity = async(opportunityId)=>{
    let result =  await Opportunity.findByIdAndDelete(opportunityId);
    return result;  
  }