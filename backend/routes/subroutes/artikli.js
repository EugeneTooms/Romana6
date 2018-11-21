const express = require('express');

const router = express.Router();

const checkAuth = require('../../middleware/check-auth');
const Database = require('../../config/database');

router.get('', checkAuth,
(req, res, next) =>{
  let database = new Database();
  database.query(`SELECT
  id, barcode, tax_group_id, amount, price_buy, price_sell, unit, name, display, prikaz_group_id, art_show_gr_id, supplier_id, qty, box_qty, img_src
 FROM articles
 Left Join bot_articles_details on article_id = id;
  `)
    .then( (artikli) =>{
      database.close();
        res.status(200).json({
          message: 'Success',
          data: artikli
        });
      }
    ).catch( err => {
      if(err === 'disconnected'){
        return res.status(500).json({
          message: 'Databse server down',
          error : err
        });
      }
      database.close();
      return res.status(500).json({
        messgae: 'Could not retrive articles',
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
    database.query(`INSERT INTO articles SET ?`, jsonMaster)
    .then((results) =>{
      insertId = results.insertId;
      jsonDetails.article_id = insertId
      return database.query(`INSERT INTO bot_articles_details SET ?`, jsonDetails);
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
    let database = new Database();
    database.query(`UPDATE articles SET
    barcode = ?,
    name = ?,
    unit = ?,
    tax_group_id = ?,
    price_sell = ?,
    price_buy = ?,
    display = ?,
    prikaz_group_id= ?,
    art_show_gr_id = ?
    WHERE id = ?`, [
      req.body.barcode,
      req.body.name,
      req.body.unit,
      req.body.tax_group_id,
      req.body.price_sell,
      req.body.price_buy,
      req.body.display,
      req.body.prikaz_group_id,
      req.body.art_show_gr_id,
      req.params.id] )
    .then((results) =>{
      return database.query(`UPDATE bot_articles_details SET
      supplier_id = ?,
      qty = ?,
      box_qty = ?,
      img_src = ? where article_id = ?`, [
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
      database.query('DELETE FROM articles WHERE id = ?', req.params.id )
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
