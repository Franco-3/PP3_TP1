const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('../register/register');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup',
    {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }
));


router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('../login/login');
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

/*
router.get('/login', (req, res) => {
    res.render('../login/login');
});
*/
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('../user/user');
});

router.get('/logout', (req, res, next) => {
    req.logOut(req.user, error => {
        if(error) return next(error);
        res.redirect('/');
    });
    
});


module.exports = router;