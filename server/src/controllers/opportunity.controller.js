const OpportunityService = require('../services/opportunity.service');
const { Opportunity } = require('../models/opportunity');


exports.createNewOpportunity = async (req, res) => {
    try {
        const {userId, name, description, evaluations} = req.body;
        // const{comprehension, qualityOfIdeaResponse} = evaluations;
        // console.log("Evaluations",comprehension);
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
    await OpportunityService.createOpportunity(userId, name, description, evaluations).then(result=>{
        res.status(200).send({
            result,
          });
    })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'error',
            message: error.message,
          });
    }
  };