const Opportunity = require("../models/opportunity").Opportunity;


exports.createOpportunity = async(userId, name, description, questions)=>{
    return await Opportunity.create({
        userId:userId,
        name:name,
        description:description,
        questions:questions
    })
 }

 exports.getOpportunity = async(userId)=>{
     return await Opportunity.find({userId:userId})
 }