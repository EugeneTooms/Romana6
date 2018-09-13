const express = require('express');

const router = express.Router();

const Database = require('../../config/database');
const database = new Database();

router.get('/',
(req, res, next) =>{
  database.query(`SELECT * FROM ugo.articles`)
      .then( (artikli) =>{
        res.status(200).json({
          message: 'Success',
          data: artikli
        });
      }
  ).catch( err => {
    return res.status(500).json({
      title: 'An error has occured',
      error : err
    });
  });
});

module.exports = router;
