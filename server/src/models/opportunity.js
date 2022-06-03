const { ObjectID } = require("bson");
var mongoose = require("mongoose");

var OpportunitySchema = new mongoose.Schema({
    userId:{
        type:String
    },
    name: {
    type: String,
    required: true,
    
  },
  description:{
    type: String,
    required: true,
  },
  isPublished:{
    type: Boolean,
    default:false,
    required:true

},
isDraft:{
    type: Boolean,
    default:false,
    required:true
},
evaluations:{
    comprehension:{
        questions:[
            {
                question:{
                    type:String
                },
                answer:{
                    type:String
                },
                isHint:{
                    type:Boolean,
                    default:false
                }
            }
        ]
    },
    qualityOfIdeaResponse:{
        questions:[
            {
                question:{
                    type:String
                },
                answer:{
                    type:String
                },
                isHint:{
                    type:Boolean,
                    default:false
                }
            }
        ]
    }
},
recipients:[
    {
        type:ObjectID,
        isInvited:{
            type:Boolean
        },
        emBeddedLink:{
            type:String
        }
    },
]
});

var Opportunity = mongoose.model('Opportunity', OpportunitySchema);

module.exports = {
    Opportunity: Opportunity
}