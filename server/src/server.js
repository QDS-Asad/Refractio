const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const users = require('./routes/user.routes');

dotenv.config();
const db = require('./config/db');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use('/', users);


const PORT = process.env.PORT || 8000; 

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));