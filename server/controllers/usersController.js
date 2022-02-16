require('../model/mongooseConnection')

const User = require('../model/User')

exports.login = async(req, res) => {
    try {
        res.render('users/login')
    } catch (error) {
        console.log('Error')
        res.render('errors/404')
    }
    
}

exports.doLogin = async(req, res) => {
    try {
        res.redirect(302, '/')
    } catch (error) {
        console.log('Error')
        res.render('errors/404')
    }
}