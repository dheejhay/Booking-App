const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors')
require('dotenv').config();
const expressSession = require('express-session');
const cookieParser = require('cookie-parser')
const csrf = require('csurf');

const app = express();

app.set('layout', './layouts/main')
app.set('view engine', 'ejs');

app.use(express.static('Public'));
app.use(expressLayouts)
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(expressSession({
    secret:process.env.SECRET, 
    resave: true,
    saveUninitialized: true,
   cookie:{secure:false}
}))

app.use(cors())

const csrfProtection = csrf({ cookie:true});
app.use(csrfProtection)



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

const userRoute = require('./server/routes/userRoutes');
app.use('/users', userRoute)

app.use('*', (req, res) => {
    res.render('errors/404', {root:__dirname})
})

// app.use((error, req, res, next) => {
//     res.render('errors/internal', {
//         title: "500: Internal Server Error",
//         status: error.status || 500,
//         error: error,
//     });
   
// });

const PORT = process.env.PORT || 9595
app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})