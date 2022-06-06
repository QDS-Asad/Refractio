const OpportunityService = require('../services/opportunity.service');


exports.createNewOpportunity = async (req, res) => {
    try {
        const {userId, name, description, questions} = req.body;
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

      //const{comprehension, qualityOfIdeaResponse} = evaluations;
        //console.log("Evaluations",comprehension);
        // const {questions} = comprehension;
        // console.log(questions);
        // for(let i = 0 ; i<questions.length; i++){
        //     console.log(questions[i].isHint);
        // }
        // let opportunityDetails = {
        //     userId:userId,
        //     name:name,
        //     description:description,
        // }
    await OpportunityService.createOpportunity(userId, name, description, questions).then(result=>{
        res.status(200).send({
            result,
          });
    })
    } catch (error) {
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