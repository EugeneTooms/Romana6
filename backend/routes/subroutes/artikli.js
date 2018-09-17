const express = require('express');

const router = express.Router();

const checkAuth = require('../../middleware/check-auth');
const Database = require('../../config/database');
const database = new Database();

router.get('', checkAuth,
(req, res, next) =>{
  database.query(`SELECT
  id, barcode, tax_group_id, amount, price_buy, price_sell, unit, name, display, prikaz_group_id, art_show_gr_id, supplier_id, qty, box_qty, img_src
 FROM ugo.articles
 Left Join bot_articles_details on article_id = id;
  `)
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

router.post('', checkAuth,
  (req,res, next) => {
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
      res.status(200).json({
        message: 'Success',
        data: insertId
      });
    })
    .catch( err => {
      console.log(err);
      return res.status(500).json({
        title: 'An error has occured',
        error: err
      })
    });
  });

  router.delete('/:id', checkAuth,
    (req,res,next) => {
      database.query('DELETE FROM articles WHERE id = ?', req.params.id )
      .then((results) =>{
        res.status(200).json({
          message: 'Success',
          data: results
        });
      })
      .catch( err => {
        return res.status(500).json({
          title: 'An error has occured',
          error: err
        })
      });
  });

module.exports = router;
