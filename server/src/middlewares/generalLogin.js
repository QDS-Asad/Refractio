const {
    body,
    validationResult
  } = require('express-validator');
  
  exports.validateGeneralUserLoginInput = [
    body('email', 'Email Address can not be empty!').exists().notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: {
                    response: {
                        "dataset": null,
                        "status": {
                            "msg": "Params email can not be empty!",
                            "action_status": false
                        },
                    }
                }
            });
        } else {
            next();
        }
    },
    body('password').not().isEmpty().withMessage('Password can not be empty!')
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/),
      (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              let msg = "";
              console.log(errors.errors[0].msg);
              if (errors.errors[0].msg == 'Invalid value') {
                  msg = "Password should be minimum eight characters, at least one letter, one number and one special character";
              } else if (errors.errors[0].msg == "Password can not be empty!") {
                  msg = "Password can not be empty!";
              }
              return res.status(422).json({
                  errors: {
                      response: {
                          "dataset": null,
                          "status": {
                              "msg": msg,
                              "action_status": false
                          },
                      }
                  }
              });
          } else {
              next();
          }
      },
  ]