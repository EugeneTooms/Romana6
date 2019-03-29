const express = require('express');

const router = express.Router();

const checkAuth = require('../../middleware/check-auth');
const Database = require('../../config/database');

router.get('',
(req, res, next) =>{
  let database = new Database();
  database.query(`SELECT
  id, tax_group_id, name, price, price_1, price_2, price_3, price_4
  FROM products
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
        messgae: 'Could not retrive products',
        error : err
      });
    });
});
router.get('/:id',
(req, res, next) =>{
  let database = new Database();
  database.query(`SELECT
  id, tax_group_id, name, price, price_1, price_2, price_3, price_4
  FROM products
  WHERE id = ?
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
        messgae: 'Could not retrive products',
        error : err
      });
    });
});

router.get('/details/:id',
(req, res, next) =>{
  let database = new Database();
  database.query(`SELECT product_items.id,
  product_items.article_id, articles.name, product_items.amount FROM product_items
  Left Join articles on articles.id = product_items.article_id
  where product_items.product_id = ?
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
        messgae: 'Could not retrive products',
        error : err
      });
    });
});
router.post('',
  (req,res, next) => {
    let database = new Database();
    let insertId = 0;
    let jsonDetails = []
    let jsonMaster = {
      name : req.body.product.name,
      tax_group_id: req.body.product.tax_group_id,
      price: req.body.product.price,
    };
    database.query(`INSERT INTO products SET ?`, jsonMaster)
    .then((results) =>{
      insertId = results.insertId;
      req.body.productDetails.forEach(element => {
        jsonDetails.push([
          product_id = insertId,
          article_id = element.id,
          amount = element.amount
        ])
      });
      return database.query(`INSERT INTO product_items (product_id,article_id,amount) VALUES ?`, [jsonDetails]);
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

  router.put('/:id',
  (req,res,next) => {
    let jsonDetails = []
    let deleted = []
    let database = new Database();
    database.query(`UPDATE products SET
    name = ?,
    tax_group_id = ?,
    price = ?,
    price_1 = ?,
    price_2 = ?,
    price_3 = ?,
    price_4= ?
    WHERE id = ?`, [
      req.body.product.name,
      req.body.product.tax_group_id,
      req.body.product.price,
      req.body.product.price_1,
      req.body.product.price_2,
      req.body.product.price_3,
      req.body.product.price_4,
      req.params.id] )
    .then( (results) => {
        if (req.body.removedDetails.length > 0) {
          req.body.removedDetails.forEach(element => {
            deleted.push([
              id = element.table_id
            ])
          });
          return database.query(`DELETE from product_items WHERE id IN ( ? )`, [deleted]);
        }
      })
    .then((results) =>{
      req.body.productDetails.forEach(element => {
        jsonDetails.push([
          product_id = req.params.id,
          article_id = element.id,
          amount = element.amount
        ])
      });
      return database.query(`INSERT INTO product_items (product_id,article_id,amount) VALUES ?
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
  router.delete('/:id',
    (req,res,next) => {
      let database = new Database();
      database.query('DELETE FROM products WHERE id = ?', req.params.id )
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
