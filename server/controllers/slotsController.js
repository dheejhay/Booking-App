require('../model/mongooseConnection')

const Slot = require('../model/Slot')

exports.index = async(req, res) => {
const slots = await Slot.find({})
// console.log(slots)
    res.render('slots/index', {title: 'slot', slots, activeNav: "Slot"})
}

exports.add = async(req, res) => {
    try {
        res.render('slots/add', {title: 'slot',  csrfToken:req.csrfToken()})

    } catch (error) {
        console.log('Error')
        res.render('errors/404', {title: 'error'})
    }
    
}

exports.save = async(req, res) => {
    try {
        const slot = new Slot({
            date: (req.body.date),      
            quantity: req.body.quantity
        });
        await slot.save()
        console.log(slot)
        res.render('slots/index', {title: 'slots'})
    } catch (error) {
        console.log('error')
        res.render('errors/404', {title: 'slots'})
    }
    
}

exports.edit = async(req, res) => {
    res.render('slots/edit', {title: 'edit', slot})
}

exports.update = async(req, res) => {
    res.render('slots/edit', {title: 'slots'})
}

exports.confirm = async(req, res) => {
    res.render('')
}

exports.delete = async(req, res) => {
    res.render('slots/delete', {title: 'delete'})
}