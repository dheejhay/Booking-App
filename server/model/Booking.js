const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    slot: {
        type:mongoose.Types.ObjectId, ref:'Slot'
    },
    user: {
        type: mongoose.Types.ObjectId, ref:'User'
    }
})

module.exports = mongoose.model('Booking', bookingSchema)