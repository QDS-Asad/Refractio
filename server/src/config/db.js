const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.DB_URI, connectionParams)
  .then(() => {
    console.info('Connected to the Database');
  })
  .catch((e) => {
    console.log('Error:', e);
    process.exit(1);
  });
