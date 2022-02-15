const express = require('express');

//Getting our routes
const router = require('express').Router();

const controller = require('../controllers/pagesController')

router.get('/', controller.home)

router.get('/error', controller.error)

module.exports = router;