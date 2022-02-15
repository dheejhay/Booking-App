require('../model/mongooseConnection')

const Booking = require('../model/Booking')
const Slot = require('../model/Slot')
const FailedBooking = require('../model/FailedBooking')
const User = require('../model/User')

exports.index = async (req, res) => {
    const bookings = await Booking.find({}).populate('slot')
    res.render('bookings/index', {title: 'booking', bookings})
}

exports.add = async (req, res) => {
    const slot = await Slot.find({})
    res.render('bookings/add', {
        title: 'booking',  slot, csrfToken:req.csrfToken()})
}

exports.save = async (req, res) => {
    let user = await User.findOne().where("phone_number").equals(req.body.phone_number)
     user = new User ({
        name: req.body.name,
        phone_number: req.body.phone_number
    })

    if(user == user.phone_number) {
        console.log("user exist")
    } else {
        await user.save()
    }

    let booking_date = req.body.date
    const next_date = new Date(booking_date);
    next_date.setDate(next_date.getDate() + 1);
    booking_date = new Date(booking_date);

    const slot = await Slot.findOne()
        .where('date')
        .gte(new Date(booking_date)).lt(new Date(next_date))
        .exec();


    const failedbooking = new FailedBooking ({
        user: user._id,
        date: booking_date
    })
    
    if (slot !== null) {
        if (slot.quantity > 0) {
            const booking = new Booking ({
                user: user._id,
                slot: slot._id
            })  
       await booking.save() 
       
       var decrement = slot.quantity - 1
      await Slot.updateOne({_id:slot._id}, {quantity:decrement})

      if(!user.name){
       res.render('bookings/user',{title:"form-user", csrfToken:req.csrfToken()})
      } else{
          res.redirect(302, "/bookings")
      }
     
        } else {
        
            await failedbooking.save()
            res.render('failed_bookings/index')
        }
    } else {
        await failedbooking.save()
        res.render('failed_bookings/index')
    }



// res.render('bookings/add', {title: 'booking'})

}

exports.updateUser = async (req, res) => {
    phone_number = req.body.phone_number
    const user = await User.findOne({phone_number:phone_number})
    user.name = req.body.name
    user.password = req.body.password
    await User.save()
    res.redirect(302, "/bookings")
}

exports.edit = async (req, res) => {
    const id = req.params.slot_id
    const booking = await Booking.findById(id)
    res.render('bookings/edit', {title: 'edit', booking})
}

exports.update = async (req, res) => {
    const id = req.params.slot
    const booking = await Booking.updateOne({
        _id: id
    }, {
        name: req.body.name,
        phone_number: req.body.phone_number,
        date: (req.body.date),
        slot: req.body.slot
    })
    res.render('bookings/edit')
}