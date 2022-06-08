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