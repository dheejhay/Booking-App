require('../model/mongooseConnection')

exports.home = async (req, res) => {

    res.render('pages/home')
}

exports.error = async (req, res) => {

    res.render('errors/404')
}