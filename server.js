const express = require('express');
const cors = require('cors');
const session = require('express-session')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const constants = require('./server/src/lib/constants');
const swagger = require('./server/src/lib/swagger');
const users = require('./server/src/routes/user.routes');
const roles = require('./server/src/routes/role.routes');
require('./server/src/config/config');
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: constants.SESSION_SECRET,
    cookie: {httpOnly: true, secure: false, maxAge: 14400000 },
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', constants.CLIENT_HOST);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.get('/api/status', (req, res) => {
  res.json({ message: 'Api is working.' });
});

app.use('/api/users', users);
app.use('/api/roles', roles);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swagger));


app.use('/', express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


const PORT = constants.PORT || 4001;
app.listen(
  PORT,
  console.log(`Server running in ${constants.NODE_ENV} mode on port ${PORT}`)
);
