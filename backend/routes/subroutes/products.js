const express = require('express');

const router = express.Router();

const checkAuth = require('../../middleware/check-auth');
const Database = require('../../config/database');

router.get('', checkAuth,
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
      database.close();
      return res.status(500).json({
        messgae: 'Could not retrive products',
        error : err
      });
    });
});
router.get('/:id', checkAuth,
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
      database.close();
      return res.status(500).json({
        messgae: 'Could not retrive products',
        error : err
      });
    });
});

router.get('/details/:id', checkAuth,
(req, res, next) =>{
  let database = new Database();
  let products;
  let product_details;
  database.query(`SELECT
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
      database.close();
      return res.status(500).json({
        messgae: 'Could not retrive products',
        error : err
      });
    });
});
router.post('', checkAuth,
  (req,res, next) => {
    let database = new Database();
    let insertId = 0;
    let jsonMaster = {
      name : req.body.name,
      tax_group_id: req.body.tax_group_id,
      price_buy: req.body.price_buy,
      price_sell: req.body.price_sell,
      unit: req.body.unit,
      art_show_gr_id: req.body.art_show_gr_id,
      prikaz_group_id: req.body.prikaz_group_id,
      barcode: req.body.barcode,
      display: req.body.display
    };
    let jsonDetails = {
      article_id: null,
      img_src: req.body.img_src,
      supplier_id: req.body.supplier_id,
      box_qty: req.body.box_qty,
      qty: req.body.qty
    }
    database.query(`INSERT INTO products SET ?`, jsonMaster)
    .then((results) =>{
      insertId = results.insertId;
      jsonDetails.article_id = insertId
      return database.query(`INSERT INTO product_items SET ?`, jsonDetails);
    })
    .then( () => {
      database.close();
      res.status(200).json({
        message: 'Success',
        data: insertId
      });
    })
    .catch( err => {
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
    database.query(`UPDATE products SET
    name = ?,
    tax_group_id = ?,
    price = ?,
    price_1 = ?,
    price_2 = ?,
    price_3 = ?,
    price_4= ?
    WHERE id = ?`, [
      req.body.name,
      req.body.tax_group_id,
      req.body.price,
      req.body.price_1,
      req.body.price_2,
      req.body.price_3,
      req.body.price_4,
      req.params.id] )
    .then((results) =>{
      return database.query(`UPDATE product_items SET
      id = ?,
      article_id = ?,
      product_id = ?,
      amount = ?
      where product_id = ?`, [
        req.body.supplier_id,
        req.body.qty,
        req.body.box_qty,
        req.body.img_src,
        req.params.id]);
    })
    .then( (results) => {
      database.close();
      res.status(200).json({
        message: 'Success',
        data: results
      });
    })
    .catch( err => {
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
      database.query('DELETE FROM products WHERE id = ?', req.params.id )
      .then((results) =>{
        database.close();
        res.status(200).json({
          message: 'Success',
          data: results
        });
      })
      .catch( err => {
        database.close();
        return res.status(500).json({
          message: 'Delete failed!',
          error: err
        })
      });
  });

module.exports = router;
