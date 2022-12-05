const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors')
require('dotenv').config();
const expressSession = require('express-session');
const app = express();

const PORT = process.env.PORT || 9090

app.use(express.static('Public'));
app.use(expressLayouts)
app.use(express.urlencoded({extended:true}))
app.use(expressSession({
    secret:process.env.SECRET, 
    resave: true,
    saveUninitialized: true,
   cookie:{secure:false}
}))
app.set('layout', './layouts/main')
app.set('view engine', 'ejs');

const pageRoute = require('./server/routes/pageRoutes');
app.use('/', pageRoute)

const bookingRoute = require('./server/routes/bookingRoutes');
app.use('/bookings', bookingRoute)

const slotRoute = require('./server/routes/slotRoutes');
app.use('/slots', slotRoute)

const failedBookingRoute = require('./server/routes/failedBookingRoutes');
app.use('/failed_bookings', failedBookingRoute)


const logicRoute = require('./server/routes/logicRoutes');
app.use('/logics', logicRoute)


app.all('*', (req, res) => {
    res.render('pages/error', {root:__dirname})
})

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})
