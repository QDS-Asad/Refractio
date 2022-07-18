const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const constants = require('./server/src/lib/constants');
const swagger = require('./server/src/lib/swagger');
const plans = require('./server/src/routes/plan.routes');
const users = require('./server/src/routes/user.routes');
const opportunities = require('./server/src/routes/opportunity.routes');
const roles = require('./server/src/routes/role.routes');
const { HTTP_STATUS, ERROR_MESSAGE } = require('./server/src/lib/constants');
const { errorResp } = require('./server/src/helpers/error_helper');
require('./server/src/config/config');
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: constants.SESSION_SECRET,
    cookie: { httpOnly: true, secure: false, maxAge: 14400000 },
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger));

app.get('/api/status', (req, res) => {
  res.json({ message: 'Api is working.' });
});

app.use('/api/users', users);
app.use('/api/opportunities', opportunities);
app.use('/api/roles', roles);
app.use('/api', plans);

app.use('/', express.static(path.join(__dirname, '/client/build')));
// app.use('*', (req, res) => {
//   errorResp(res, {code: HTTP_STATUS.NOT_FOUND.CODE,msg: `${ERROR_MESSAGE.INVALID_ENDPOINT} ${req.originalUrl}`})
// });

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = constants.PORT || 4001;
app.listen(
  PORT,
  console.log(`Server running in ${constants.NODE_ENV} mode on port ${PORT}`)
);
