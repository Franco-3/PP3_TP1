const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/signup', (req, res) => {
    res.render('../register/register');
});

router.get('/signin', (req, res) => {
    res.render('../login/login');
});

router.get('/profile', (req, res) => {
    res.render('../user/user');
});

router.get('/user', (req, res) => {
    res.render('../user/user');
});

router.post('/signup', passport.authenticate('local.signup',
    {
        successRedirect: '/profile',
        failureRedirect: '/users',
        failureFlash: true
    }
));

router.post('/signin', (req, res, next) => {
        passport.authenticate('local.signin', {
            successRedirect: '/user',
            failureRedirect: '/signin',
            failureFlash: true
        })(req, res, next);
    });
   


module.exports = router;