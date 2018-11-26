const express = require('express');

const router = express.Router();

const checkAuth = require('../../middleware/check-auth');
const Database = require('../../config/database');

router.get('', checkAuth,
(req, res, next) =>{
  let database = new Database();
  database.query(`SELECT receivings.id,
  supplier_id,
  suppliers.name as supplier_name,
  price_buy,
  price_sell,
  date,
  receivings.note,
  document_date,
  number,
  posted from receivings
  Left Join suppliers on suppliers.id = receivings.supplier_id
  `)
    .then( (results) =>{
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
        messgae: 'Could not retrive receivings',
        error : err
      });
    });
});
router.get('/:id', checkAuth,
(req, res, next) =>{
  let database = new Database();
  database.query(`SELECT receivings.id,
  supplier_id,
  suppliers.name,
  price_buy,
  price_sell,
  date,
  receivings.note,
  document_date,
  number,
  posted from receivings
  Left Join suppliers on suppliers.id = receivings.supplier_id
  WHERE receivings.id = ?
  `, req.params.id)
    .then( (results) =>{
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
        messgae: 'Could not retrive receivings',
        error : err
      });
    });
});

router.get('/details/:id', checkAuth,
(req, res, next) =>{
  let database = new Database();
  database.query(`SELECT receiving_items.id,
  receiving_id,
  article_id,
  articles.name,
  receiving_items.amount,
  receiving_items.price_buy,
  receiving_items.price,
  receiving_items.discount  from receiving_items
  Left Join articles on articles.id = receiving_items.article_id
  Where receiving_id = ?
  `, req.params.id)
    .then( (results) =>{
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
        messgae: 'Could not retrive receivings',
        error : err
      });
    });
});
router.post('', checkAuth,
  (req,res, next) => {
    let database = new Database();
    let insertId = 0;
    let jsonDetails = []
    let jsonMaster = {
      number : req.body.receiving.number,
      supplier_id: req.body.receiving.supplier_id,
      price_buy: req.body.receiving.price_buy,
    };
    database.query(`INSERT INTO receivings SET ?`, jsonMaster)
    .then((results) =>{
      insertId = results.insertId;
      req.body.receivingDetails.forEach(element => {
        jsonDetails.push([
          receiving_id = insertId,
          article_id = element.article_id,
          amount = element.amount
        ])
      });
      return database.query(`INSERT INTO receiving_items (receiving_id,article_id,amount) VALUES ?`, [jsonDetails]);
    })
    .then( () => {
      database.close();
      res.status(200).json({
        message: 'Success',
        data: insertId
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
    let jsonDetails = []
    let deleted = []
    let database = new Database();
    database.query(`UPDATE receivings SET
    number = ?,
    supplier_id = ?,
    price_buy = ?,
    document_Date = ?
    WHERE id = ?`, [
      req.body.receiving.number,
      req.body.receiving.supplier_id,
      req.body.receiving.price_buy,
      req.body.receiving.document_Date,
      req.params.id] )
    .then( (results) => {
        if (req.body.removedDetails.length > 0) {
          req.body.removedDetails.forEach(element => {
            deleted.push([
              id = element.table_id
            ])
          });
          return database.query(`DELETE from receiving_items WHERE id IN ( ? )`, [deleted]);
        }
      })
    .then((results) =>{
      req.body.receivingDetails.forEach(element => {
        jsonDetails.push([
          id = element.table_id,
          receiving_id = req.params.id,
          article_id = element.article_id,
          amount = element.amount
        ])
      });
      return database.query(`INSERT INTO receiving_items (id,receiving_id,article_id,amount) VALUES ?
      ON DUPLICATE KEY UPDATE amount=VALUES(amount)`, [jsonDetails]);
    }).then( (results) => {
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
      database.query('DELETE FROM receivings WHERE id = ?', req.params.id )
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
