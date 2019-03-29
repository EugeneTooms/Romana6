const express = require('express');

const router = express.Router();

const checkAuth = require('../../middleware/check-auth');
const Database = require('../../config/database');


router.get('',
(req, res, next) =>{
  let database = new Database();
  database.query(`SELECT * FROM tax_groups
  `)
    .then( (artikli) =>{
        database.close();
        res.status(200).json({
          message: 'Success',
          data: artikli
        });
      }
    )
    .catch( err => {
      if(err === 'disconnected'){
        return res.status(500).json({
          message: 'Databse server down',
          error : err
        });
      }
      database.close();
      return res.status(500).json({
        message: 'Could not retrive suppliers',
        error : err
      });
    });
});

router.post('',
  (req,res, next) => {
    let database = new Database();
    let jsondata = req.body;
    database.query(`INSERT INTO tax_groups SET ?`, jsondata)
    .then((results) =>{
      database.close();
      res.status(200).json({
        message: 'Success',
        data: results.insertId
      });
    })
    .catch( err => {
      if(err === 'disconnected'){
        return res.status(500).json({
          message: 'Databse server down',
          error : err
        });
      }
      database.close();
      return res.status(500).json({
        message: 'Insert failed!',
        error: err
      })
    });
  });

  router.put('/:id',
  (req,res,next) => {
    let database = new Database();
    database.query(`UPDATE tax_groups SET
    name = ?,
    tax_1 = ?,
    tax_2 = ?
    WHERE id = ?`, [
      req.body.name,
      req.body.tax_1,
      req.body.tax_2,
      req.params.id] )
    .then((results) =>{
      database.close();
      res.status(200).json({
        message: 'Success',
        data: results
      });
    })
    .catch( err => {
      if(err === 'disconnected'){
        return res.status(500).json({
          message: 'Databse server down',
          error : err
        });
      }
      database.close();
      return res.status(500).json({
        message: 'Update failed!',
        error: err
      })
    });
  });

  router.delete('/:id',
    (req,res,next) => {
      let database = new Database();
      database.query('DELETE FROM tax_groups WHERE id = ?', req.params.id )
      .then((results) =>{
        database.close();
        res.status(200).json({
          message: 'Success',
          data: results
        });
      })
      .catch( err => {
        if(err === 'disconnected'){
          return res.status(500).json({
            message: 'Databse server down',
            error : err
          });
        }
        database.close();
        return res.status(500).json({
          message: 'Delete failed!',
          error: err
        })
      });
  });

module.exports = router;
