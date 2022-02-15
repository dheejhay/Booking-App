const express = require('express');

//Getting our routes
const router = require('express').Router();

const controller = require('../controllers/logicsController')

router.get('/', controller.index)

router.get('/waakye-logic', controller.queueLength)
router.post('/waakye-logic', controller.queueDecision)

router.get('/lunch-logic', controller.lunch)
router.post('/lunch-logic', controller.lunchDecision)

module.exports = router;