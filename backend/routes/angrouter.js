const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

router.use('/auth', require('./auth/angauth'));
router.use('/articles', require('./subroutes/artikli'));

module.exports = router;
