const mongoose = require('mongoose');

// mongoose.connect(
//     "mongodb://localhost:27017/",
//     {
//       dbName: "refractio_db",
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//     (err) =>
//       err ? console.log(err) : console.log(
//         "Connected to refractio database")
//   );

mongoose.connect('mongodb://localhost:27017/refractio_db');
// const MyModel = mongoose.model('Test', new Schema({ name: String }));
// // Works
// MyModel.findOne(function(error, result) { /* ... */ });
//const Schema = mongoose.Schema;
// const schema = new mongoose.Schema({
//     name: String
//   }, {
//     capped: { size: 1024 },
//     bufferCommands: false,
//     autoCreate: false // disable `autoCreate` since `bufferCommands` is false
//   });
  
  //const Model = mongoose.model('Test', schema);
  // Explicitly create the collection before using it
  // so the collection is capped.
 // Model.createCollection();

  