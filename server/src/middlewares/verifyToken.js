const jwt = require("jsonwebtoken");
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({
            dataset: null,
            status: {
                "msg": "Authentication Failed! A token is needed.",
                "action_status": false
            }
        });
    }
    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) {
            return res.status(401).send({
                dataset: null,
                status: {
                    "msg": "Invalid Token!",
                    "action_status": false
                }
            });
        } else {
            return next();
        }
    });
    
}

module.exports = verifyToken;
