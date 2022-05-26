const { body } = require('express-validator')

exports.validate = (method) => {
  switch (method) {
    case 'register': {
     return [ 
        body('fullName', 'fullName does not exists').exists(),
        body('email', 'Invalid email').exists().isEmail(),
        body('password','password does not exits').exists()
       ]   
    }
  }
}