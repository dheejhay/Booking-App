const express = require('express');
const User = require('../model/User')

const bcrypt = require('bcrypt')

//Getting our routes
const router = require('express').Router();

const passport = require('passport');
const localStrategy = require('passport-local');

const controller = require('../controllers/usersController');
// const res = require('express/lib/response');

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
    new localStrategy({passReqToCallback: true},
        async function verify(req, username, password, cb) {
           let user = await User.findOne({phone_number:username})
           
            if (user) {
                if(user.active){
                const passwordVerified = await bcrypt.compare(password, user.password);
                if(passwordVerified) {
                        return cb(null, user); //verification successful
                }    
            } else {
                return cb(null, false, req.flash('message', 'Account has been deactivated'))
            }
        }
            // loginTracker(req, user)
            return cb(null, false, req.flash('message', 'Invalid phone number or password'))
        })
);

passport.serializeUser(function (user, cb) {
    return cb(null, user);
});

passport.deserializeUser(function (user, cb) {
    return cb(null, user);
});


// const loginTracker = async (req, user) => {
//    const session = req.session
//    if(!session.maxFailedAttempt){
//         session.maxFailedAttempt = 5
//    } else {
//        session.maxFailedAttempt -=1
//        if(session.maxFailedAttempt < 1){
//             user.active = false
//             await user.save()
//        }
//    }
//    console.log(session.maxFailedAttempt)
// }

// const permitted = ["/"];

const showNav = (req, res, next) => {
    res.locals.user = req.user || {};
    let nav = [{name: "Home", url: "/"}];
    if (req.user) {
        if (req.user.role == 'user') {
            let loadNav = { name: "Book", url: "/bookings"};
            nav.push(loadNav);
        } else {
            let adminNav = [{ name: "Slot", url: "/slots"}, 
            { name: "Book", url: "/bookings"},
            { name: "Failed Bookings", url: "/failed_bookings" }, 
            {name: "Users", url: "/users"}];
            nav = nav.concat(adminNav);
        }  
    }

    if(req.isAuthenticated()){
        nav.push({name: "Logout", url: "/users/logout"})
    } else {
      nav.push({name: "Login", url: "/users/login"})
    }
    res.locals.navigation = nav;
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

router.get('/users/unauthorised', controller.unauthorised)
router.get('/users', controller.index)

router.get('/users/add', controller.add) 
router.post('/users/add', controller.save)   

router.get('/users/edit/:id', controller.edit) 
router.post('/users/edit/:id', controller.update)  

router.get('/users/delete/:id', controller.confirm) 
router.post('/users/delete/:id', controller.delete)   

// router.use(loginTracker)

module.exports = router;