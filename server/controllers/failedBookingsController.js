require('../model/mongooseConnection')

const FailedBooking = require('../model/FailedBooking')
const Booking = require('../model/Booking')
const Slot = require('../model/Slot')

exports.index = async(req, res) => {
    const failedbookings = await FailedBooking.find({})
    res.render('failed_bookings/index', {title: 'failedbooking', failedbookings, csrfToken:req.csrfToken()})
}

exports.add = async(req, res) => {

    res.render('failedBookings/add', {title: 'failedbooking'})
}

exports.save = async(req, res) => {

    res.render('/add')
}

exports.edit = async(req, res) => {

    res.render('/edit')
}

exports.update = async(req, res) => {

    res.render('/edit')
}
