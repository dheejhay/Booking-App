require('../model/mongooseConnection')

const User = require('../model/User')

// exports.signup = async(req,res) => {
//     res.render('users/signup')
// }

// exports.sign = async(req,res) => { 
//     res.locals.csrfToken = req.csrfToken()
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10)
//         new User({
//             name: 'Melina',
//             phone_number: '233203681960',
//             password: hashedPassword
//         })
//         res.redirect('/users/login')
//     } catch (error) {
//         res.redirect('/users/signup')
//     }
//     console.log(User)
// }

exports.login = async(req, res) => {
    var message = req.flash().message
    res.locals.csrfToken = req.csrfToken()
        res.render('users/login', {title: "user", message})
  
}

exports.authenticateLogin = async(req, res) => {
    try {
        res.redirect(302, '/')
    } catch (error) {
        console.log('Error')
        // res.render('errors/404')
    }
}

exports.profile = async (req, res) => { 
    res.render('users/profile')
}

exports.logout = async(req,res) => {
    req.logout()
    res.render('users/logout')
} 