const express = require('express');
const router = express.Router()

const crud = require('./crud')
const products = require('./products')

module.exports = router
/**
 * Here is where we are assigning our routes
 * crude.js API no longer need to start with '/crud'
 */

router.use('/crud', crud)
router.use('/products', products)