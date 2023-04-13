const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('local.signup', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {

    console.log(req.body);
    
}));
/*
passport.serializeUser((usr, done) => {

});
*/