const mongoose = require('mongoose');
const{ Roles } = require("../models/roles");
const { CONNECTION_STRING, MIGRATION_STRING, SUCCESS_MESSAGE, ERROR_MESSAGE} = require('../lib/constants');

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(CONNECTION_STRING, connectionParams)
  .then(() => {
    // console.info(SUCCESS_MESSAGE.DB_CONNECTED);
  })
  .catch((e) => {
    mongoose.connect(MIGRATION_STRING, connectionParams)
    .catch((e) => {
      console.log(ERROR_MESSAGE.DB_NOT_CONNECTED, e);
      process.exit(1);
    });
  });
