const express = require('express');

//Getting our routes
const router = require('express').Router();

const controller = require('../controllers/failedBookingsController')

router.get('/', controller.index)

router.get('/add', controller.add)
router.post('/add', controller.save)

module.exports = router;