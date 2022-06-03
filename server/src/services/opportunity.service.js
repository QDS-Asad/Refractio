const Opportunity = require("../models/opportunity").Opportunity;


exports.createOpportunity = async(userId, name, description, evaluations)=>{
    return await Opportunity.create({
        userId:userId,
        name:name,
        description:description,
        evaluations:evaluations
    })
 }