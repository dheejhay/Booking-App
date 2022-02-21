const mongoose = require('mongoose')

const failedBookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId, ref:'User'
    },
    date: {
        type:Date
    }
})

module.exports = mongoose.model('FailedBooking', failedBookingSchema)