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
    new localStrategy({
            passReqToCallback: true
        },
        async function verify(req, phone_number, password, cb) {
            // const user = await User.findOne({phone_number:username})
            const user = ({
                phone_number: "233203681960",
                password: "jay@2"
            })
            if (user) {
                if (user.phone_number === phone_number && user.password === password) {
                    return cb(null, user); //verification successful

                }
            }
            return cb(null, false, req.flash('message', 'Invalid phone number or password'))
        })
);

passport.serializeUser(function (user, cb) {
    return cb(null, user);
});

passport.deserializeUser(function (user, cb) {
    return cb(null, user);
});


// const loginTracker = (req, res) => {
//     req.session.maxFailedAttempts;
//     for(let failedLogIn in req.session.maxFailedAttempts){
//         if(req.session.maxFailedAttempts == 'undefined'){
//             req.session.maxFailedAttempts -= 1; 
//         }

//     }
//     console.log(req.session.maxFailedAttempts)
// }

// const permitted = ["/"];

const showNav = (req, res, next) => {
    let nav = [{name: "Home", url: "/"}];
    if (req.user) {
        if (req.user.role == 'user') {
            let loadNav = { name: "Book", url: "/bookings"};
            nav.push(loadNav);
        } else {
            let adminNav = [{ name: "Slot", url: "/slots"}, { name: "Failed Bookings", url: "/failed_bookings" }];
            nav = nav.concat(adminNav);
        }
        if(req.isAuthenticated()){
            nav.push({name: "Logout", url: "/users/logout",})
        } else {
          nav.push({name: "Login", url: "/users/login",})
        }
       
    }
    res.locals.nav = nav;
    next();
}

const checkAuthentication = (req, res, next) => {
    res.locals.isLoggedIn = false;
    res.locals.whitelisted = false;

    if (req.path === '/') {
        res.locals.whitelisted = true;

        if (req.isAuthenticated()) {
            res.locals.isLoggedIn = true;
        }
    } else {
        if (req.isAuthenticated()) {
            res.locals.isLoggedIn = true;
        } else {
            return res.redirect('users/login')
        }
    }
    res.locals.user = req.user || {};
    next();
};

// router.get('/users/signup', controller.signup)
// router.post('/users/signup', controller.sign)
router.get('/users/login', controller.login)
router.get('/users/logout', controller.logout)
router.post('/users/login', passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    controller.authenticateLogin)

router.use(checkAuthentication)
router.use(showNav)
// router.use(loginTracker)

router.get('/profile', controller.profile)

module.exports = router;