const express = require('express');
const router = express.Router();


const OpportunityController = require('../controllers/opportunity.controller');


router.post('/create-new-opportunity', OpportunityController.createNewOpportunity);
router.get('/get-opportunity',OpportunityController.getOpportunity);
router.post('/edit-opportunity', OpportunityController.editOpportunity);
router.delete('/delete-opportunity', OpportunityController.deleteOpportunity);


module.exports = router;
