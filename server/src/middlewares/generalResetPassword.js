const {
    body,
    validationResult
  } = require('express-validator');
  
  exports.validateGeneralUserResetPasswordInput = [
    body('newPassword').not().isEmpty().withMessage('Password can not be empty!')
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/),
      (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              let msg = "";
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
    body('confirmPassword').not().isEmpty().withMessage('Password can not be empty!')
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/),
      (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              let msg = "";
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