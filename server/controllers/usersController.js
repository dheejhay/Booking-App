require('../model/mongooseConnection')

const User = require('../model/User')

const bcrypt = require('bcrypt')

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
    const message = req.flash().message
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

exports.index = async(req, res) => {
    const users = await User.find({})
        res.render('users/index', {title: 'user', users})
    }

exports.add = async(req, res) => {
    res.render('users/add', {title: 'user',  csrfToken:req.csrfToken()})
}

exports.save = async(req, res) => {
    let hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User ({
        name: req.body.name,
        phone_number: req.body.phone_number,
        password: hashedPassword,
  
        role: req.body.role
    })
    await user.save()
    res.render('users/index')
}

exports.edit = async(req, res) => {
    const user = await User.findById(req.params.user_id)
    res.render('users/edit', {title: 'edit', user,  csrfToken:req.csrfToken()})
}

exports.update = async(req, res) => {
    const message = req.flash().message
    let hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await User.updateOne({_id: req.params.user_id},
        {
            name: req.body.name,
            phone_number: req.body.phone_number,
            password: hashedPassword,
            role: req.body.role  
        })
       
    res.render('users/index', {message: "Details updated succesfully", user})
}

exports.confirm = async(req, res) => {
    res.render('users/delete', {title: 'delete'})
}

exports.delete = async(req, res) => {
    const user = await User.deleteOne({_id: req.params.user_id})
    res.redirect(302, 'users/index', {title: 'delete', user})
}

exports.logout = async(req,res) => {
    req.logout()
    res.render('users/logout')
} 