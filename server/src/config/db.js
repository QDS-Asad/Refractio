const mongoose = require('mongoose');

const dbUrl = "mongodb+srv://qdsravi:iBQFBbRGpVOgbkSQ@cluster0.mt4zc.mongodb.net/refractio_db?retryWrites=true&w=majority"

const connectionParams = {
  useNewUrlParser : true,
  useUnifiedTopology: true,
}

mongoose.connect(dbUrl, connectionParams).then(()=>{
console.info("Connected to the Database");
})
.catch((e)=>{
  console.log("Error:", e)
})