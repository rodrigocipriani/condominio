const PassportLocalStrategy = require('passport-local').Strategy;


/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done, app) => {

    const UserService = app.services.UserService;

    const userData = {
        email: email.trim(),
        password: password.trim(),
        name: req.body.name.trim()
    };

    // const newUser = new User(userData);
    UserService.save(userData, (err) => {
        if (err) { return done(err); }

        return done(null);
    });
});