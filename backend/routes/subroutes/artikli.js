const express = require('express');

const router = express.Router();

const databaseconfig = require('../../config/databaseconnection')
const databaseconnection = databaseconfig.getDBconnection();

router.get('/',
(req, res, next) =>{
  databaseconnection.query(`SELECT * FROM ugo.articles`,
      (error, artikli) =>{
              if(error) {
                  return res.status(500).json({
                      title: 'An error has occured',
                      error : error
                  });
              }
              res.status(200).json({
                  message: 'Success',
                  data: artikli
              });
      }
  );
});

module.exports = router;
