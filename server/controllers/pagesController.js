require('../model/mongooseConnection')

exports.home = async (req, res) => {

    res.render('pages/home', {title: 'Home', activeNav: "Home"})
}

exports.error = async (req, res) => {

    res.render('errors/404', {title: 'home'})
}