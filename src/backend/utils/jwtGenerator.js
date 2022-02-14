const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtGenerator(login) {
    const payload = {
        user: login
    }

    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1h"});
}

module.exports = jwtGenerator;