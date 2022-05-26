const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();

app.use(express.json());

app.use('/', express.static(path.join(__dirname, '/client/build')));
app.get('/api', (req, res) => {
  res.json({ message: 'Api is working' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Application is running in at ${port} port.`);
});
