const jwt = require('jsonwebtoken');


/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
    console.log(0);

    // const UserService = app.services.UserService;

    console.log(1);

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    console.log(2);

    // get the last part from a authorization header string like "bearer token-value"
    const token = req.headers.authorization.split(' ')[1];

    console.log(3);

    // decode the token using a secret key-phrase
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {

        console.log(4);
        // the 401 code is for unauthorized status
        if (err) { return res.status(401).end(); }

        const userId = decoded.sub;
        console.log(5);
        // check if a user exists
        return UserService.findById(userId, (userErr, user) => {
            console.log('user', userId, user, userErr);
            if (userErr || !user) {
                return res.status(401).end();
            }
            console.log(8);
            return next();
        });
    });
};