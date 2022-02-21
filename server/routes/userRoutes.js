const express = require('express');
const User = require('../model/User')

//Getting our routes
const router = require('express').Router();

const passport = require('passport');
const localStrategy = require('passport-local');

const controller = require('../controllers/usersController');
const res = require('express/lib/response');

router.use(passport.initialize());
router.use(passport.session());

// passport.use(new localStrategy({
//     passReqToCallback: true
// },
// (req, phone_number, password, cb) => {
//     const user = new User({phone_number: "233203681960", password: "jay@2"}, (err) => {
//         if (err) cb(err)
//         if(user){
//             if(user.password === password && user.phone_number === phone_number) {
//                 console.log('user exist')
//                 return cb(null, false, req.flash('message', "User exist"))
//             }else {
//                 console.log("user does not exist")
//                 return cb(null, user, req.flash('message', 'User does not exist'))
//             }
//         } 
//         return cb(null, false)
//     })
// }
// )) 

passport.use(
    new localStrategy ({ passReqToCallback: true},
        async function verify(req, phone_number, password, cb) {
        // const user = await User.findOne({phone_number:username})
        console.log(phone_number)
        console.log(password)
        const user = ({
            phone_number: "233203681960",
            password: "jay@2"
        })
        if(user){
            if(user.phone_number === phone_number && user.password === password ) {
                return cb(null, user);
                
            } 
        }
        return cb(null, false, req.flash('message', 'Invalid phone number or password'))
    })
);

passport.serializeUser(function(user, cb) {
    return cb(null, user);
});

passport.deserializeUser(function(user, cb) {
    return cb(null, user);
});

const isLoggedIn =(req, res, next) => {
    res.locals.isLoggedIn = false;
    if(req.isAuthenticated()){
        res.locals.isLoggedIn = true;
        next()
    }else {
        res.redirect('/users/login')
    }
}

const permitted = ["/"];

const checkAuthentication = (req, res, next) => {
    res.locals.isAuthenticated = false;
    res.locals.whitelisted = false;

    if(req.path === permitted){
        res.locals.whitelisted = true;
    }
    if(req.isAuthenticated()){
        res.locals.isAuthenticated = true;
    }else {
        return res.redirect('users/login')
    }
    next();
}

// router.get('/users/signup', controller.signup)
// router.post('/users/signup', controller.sign)
router.get('/users/login', controller.login)
router.get('/users/logout', controller.logout)
router.post('/users/login', passport.authenticate("local", {
    failureRedirect: "/login",  
    failureFlash: true}),
    controller.authenticateLogin)

router.use(isLoggedIn)
router.use(checkAuthentication)

router.get('/profile', controller.profile)

module.exports = router;