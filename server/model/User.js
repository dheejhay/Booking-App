const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type:String
    },
    phone_number: {
        type:Number
    },
    password: {
        type:String
    },
    active: {
        type: Boolean,
        default: true,
    },
    role: {
        type:String,
        default: 'user'
    }
})

module.exports = mongoose.model('User', userSchema)