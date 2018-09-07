const express = require('express');

const router = express.Router();

const databaseconfig = require('../../config/databaseconnection')
const databaseconnection = databaseconfig.getDBconnection();

router.use('/',(req, res, next) => {
  res.json({
    message : 'Success',
    artikli : {'sss': '111'}
  })
});

module.exports = router;
