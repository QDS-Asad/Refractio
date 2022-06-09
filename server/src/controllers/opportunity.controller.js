const OpportunityService = require('../services/opportunity.service');
const Opportunity = require("../models/opportunity").Opportunity;
const MetaData = require('../models/projectmetadata').MetaData;


exports.createNewOpportunity = async (req, res) => {
    try {
        const {userId, name, description, questions,isPublished, isDraft} = req.body;
        //const {comprehension, qualityOfIdeaResponse} =  questions;
        //console.log("userId",userId);
        const metaData = await MetaData.find();
        console.log("meta",metaData);
        const user= await OpportunityService.getUserById(userId);
        console.log('user', user);
        if(user){
          let roles = user.roles;
          if(roles[0].role.includes("Administrator"||"Organiser")){
            const opportunityCount = await Opportunity.count({userId: userId});
        if (opportunityCount>=12){
        return res.status(200).send({
            status:"error",
            message:"Can't Create Opportunity Max limit is 12 reached."
        })
    }
            await OpportunityService.createOpportunity(userId, name, description, questions, isPublished, isDraft).then(result=>{
              res.status(200).send({
                  result,
                });
          })
          }
          else{
            return res.status(401).send({
              status:"Unauthorised access.",
              message:"User doesn't have permissions to create opportunity."

            })
          }
        }     
        // if(!comprehension){
        //     return res.status(200).send({
        //         status:"error",
        //         message:"Atleast one question of comprehension is required!"
        //     })
        // };
        // if(!qualityOfIdeaResponse){
        //     return res.status(200).send({
        //         status:"error",
        //         message:"Atleast one question of quality of idea is required!"
        //     })
        // };
    
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'error',
            message: error.message,
          });
    }
  };


  exports.getOpportunity = async(req, res)=>{
      try {
          const {userId} = req.body;
          let result = await OpportunityService.getOpportunity(userId).then(result=>{
            res.status(200).send({
                result,
              });
        });
      } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message,
          });
      }
  }

  exports.editOpportunity = async(req, res)=>{
    try {
        const {opportunityId, name, description, questions,isPublished, isDraft} = req.body
        const {comprehension, qualityOfIdeaResponse} =  questions;
         if(!comprehension){
            return res.status(200).send({
                status:"error",
                message:"Atleast one question of comprehension is required!"
            })
        };
        if(!qualityOfIdeaResponse){
            return res.status(200).send({
                status:"error",
                message:"Atleast one question of quality of idea is required!"
            })
        };
        let result = await OpportunityService.modifyOpportunity(opportunityId, name, description, questions,isPublished, isDraft);
        if (result) {
          res.status(200).send({
            status: 'Success',
            message: 'Opportunities Updated Successfully.',
          });
        }
    } catch (error) {
        console.log(error);
      res.status(500).send({
          status: 'error',
          message: error.message,
        });
    }
}

exports.deleteOpportunity = async(req, res)=>{
    try {
        const {opportunityId} = req.body
        let result = await OpportunityService.deleteOpportunity(opportunityId);
        if (result) {
          res.status(200).send({
            status: 'Success',
            message: 'Opportunities Deleted Successfully.',
          });
        }
    } catch (error) {
        console.log(error);
      res.status(500).send({
          status: 'error',
          message: error.message,
        });
    }
}