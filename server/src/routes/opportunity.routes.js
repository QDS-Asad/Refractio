const express = require('express');
const router = express.Router();


const OpportunityController = require('../controllers/opportunity.controller');


router.post('/create-new-opportunity', OpportunityController.createNewOpportunity);


module.exports = router;
