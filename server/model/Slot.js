const mongoose = require('mongoose')

const slotSchema = new mongoose.Schema({
    date: {
        type:Date
    },
    quantity: {
        type:Number
    }
})

module.exports = mongoose.model('Slot', slotSchema)