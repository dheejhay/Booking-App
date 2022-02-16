const express = require('express');

//Getting our routes
const router = require('express').Router();

const passport = require('passport');
const localStrategy = require('passport-local');

const controller = require('../controllers/usersController')

router.use(passport.initialize());
router.use(passport.session());

passport.use(
    new localStrategy(function verify(username, password, cb) {
        const user = {};
        return cb(null, user);
    })
);

passport.serializeUser(function(user, cb) {
    return cb(null, user);
});

passport.deserializeUser(function(user, cb) {
    return cb(null, user);
});

const isLoggedIn =(req, res, next) => {
    res.locals.loggedIn = false;
    if(req.isAuthenticated()){
        res.locals.loggedIn = true;
        next()
    }else {
        res.redirect('/login')
    }
}

router.get('/login', controller.login)
router.post('/login', passport.authenticate("local", {failureRedirect: "/login"}), controller.authenticateLogin)
router.use(isLoggedIn)


module.exports = router;