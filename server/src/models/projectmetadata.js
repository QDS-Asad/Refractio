var mongoose = require("mongoose");


var MetaDataSchema = new mongoose.Schema({
   roles:[{
       role:{
           type:String,
           default:"Participant"
       },
       key:{
           type:String,
           default:"participant"
       },
       permissions:[
           {
               type:String
           }
       ],
   }],
   permissions:[
    {
        value:{
            type:String
        },
        key:{
            type:String
        }
    }
] 
});


var MetaData = mongoose.model('MetaData', MetaDataSchema);

module.exports = {
    MetaData: MetaData
}











