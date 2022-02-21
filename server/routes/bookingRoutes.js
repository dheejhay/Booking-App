const express = require('express');


//Getting our routes
const router = require('express').Router();

const controller = require('../controllers/bookingsController')

router.get('/', controller.index)

router.get('/user', controller.updateUser)
router.post('/user', controller.saveUser)

router.get('/add', controller.add)
router.post('/add', controller.save)

router.get('/edit/:slot_id', controller.edit)
router.get('/edit/:slot_id', controller.update)

module.exports = router;