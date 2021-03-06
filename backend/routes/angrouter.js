const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

router.use('/auth', require('./auth/angauth'));
router.use('/articles', require('./subroutes/artikli'));
router.use('/suppliers', require('./subroutes/suppliers'));
router.use('/products', require('./subroutes/products'));
router.use('/receivings', require('./subroutes/receivings'));
router.use('/taxgroup', require('./subroutes/taxgroup'));
router.use('/locations', require('./subroutes/locations'));

module.exports = router;
