const express = require('express');

const router = express.Router();

const checkAuth = require('../../middleware/check-auth');
const Database = require('../../config/database');
const database = new Database();

router.get('', checkAuth,
(req, res, next) =>{
  database.query(`
  SELECT
  id,
  barcode,
  tax_group_id,
  amount,
  price_buy,
  price_sell,
  unit,
  name,
  display,
  prikaz_group_id,
  art_show_gr_id,
  supplier_id,
  qty,
  box_qty,
  img
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

module.exports = router;
