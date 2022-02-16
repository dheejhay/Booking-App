require('../model/mongooseConnection')

const User = require('../model/User')

exports.login = async(req, res) => {
    res.locals.csrfToken = req.csrfToken()
    try {
        res.render('users/login', {title: "user"})
    } catch (error) {
        console.log('Error')
        res.render('errors/404')
    }
    
}

exports.authenticateLogin = async(req, res) => {
    try {
        res.redirect(302, '/')
    } catch (error) {
        console.log('Error')
        res.render('errors/404')
    }
}