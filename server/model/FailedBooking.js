const mongoose = require('mongoose')

const failedBookingSchema = new mongoose.Schema({
    name: {
        type:String
    },
    phone_number: {
        type:Number
    },
    date: {
        type:Date
    }
})

module.exports = mongoose.model('FailedBooking', failedBookingSchema)