const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');

dotenv.config();

const db = require('./server/src/config/db');

const users = require('./server/src/routes/user.routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.use(bodyParser.json());

app.get('/api/status', (req, res) => {
  res.json({ message: 'Api is working.' });
});

app.use('/api/users', users);

app.use('/', express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 4001;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
