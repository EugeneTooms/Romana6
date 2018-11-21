const express = require('express');

const router = express.Router();

const checkAuth = require('../../middleware/check-auth');
const Database = require('../../config/database');


router.get('', checkAuth,
(req, res, next) =>{
  let database = new Database();
  database.query(`SELECT
  id,
  name,
  address,
  city,
  phone,
  display,
  zip,
  oib,
  contact_person,
  bank_account,
  email,
  note FROM suppliers
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

router.post('', checkAuth,
  (req,res, next) => {
    let database = new Database();
    let jsondata = req.body;
    database.query(`INSERT INTO suppliers SET ?`, jsondata)
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

  router.put('/:id', checkAuth,
  (req,res,next) => {
    let database = new Database();
    database.query(`UPDATE suppliers SET
    name = ?,
    address = ?,
    city = ?,
    phone = ?,
    display = ?,
    zip = ?,
    oib = ?,
    contact_person = ?,
    bank_account = ?,
    email = ?,
    note = ?
    WHERE id = ?`, [
      req.body.name,
      req.body.address,
      req.body.city,
      req.body.phone,
      req.body.display,
      req.body.zip,
      req.body.oib,
      req.body.contact_person,
      req.body.bank_account,
      req.body.email,
      req.body.note,
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

  router.delete('/:id', checkAuth,
    (req,res,next) => {
      let database = new Database();
      database.query('DELETE FROM suppliers WHERE id = ?', req.params.id )
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
