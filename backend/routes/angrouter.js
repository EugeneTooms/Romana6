const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

router.use('/auth', require('./auth/angauth'));
router.use('/articles', require('./subroutes/artikli'));
router.use('/suppliers', require('./subroutes/suppliers'));

module.exports = router;
