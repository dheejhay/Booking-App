const express = require('express');

//Getting our routes
const router = require('express').Router();

const controller = require('../controllers/slotsController')

router.get('/', controller.index)

router.get('/add', controller.add)
router.post('/add', controller.save)

router.get('/slots/edit/:slot_id', controller.edit)
router.get('/slots/edit/:slot_id', controller.update)

module.exports = router;