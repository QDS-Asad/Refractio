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
       }
   }] 
});


var MetaData = mongoose.model('MetaData', MetaDataSchema);

module.exports = {
    MetaData: MetaData
}











