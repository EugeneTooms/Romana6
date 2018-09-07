const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth/angauth'));
router.use('/artikli', require('./subroutes/artikli'));

module.exports = router;
