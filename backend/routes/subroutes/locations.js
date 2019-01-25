const express = require('express');

const router = express.Router();

const checkAuth = require('../../middleware/check-auth');
const Database = require('../../config/database');

router.get('', checkAuth,
(req, res, next) =>{
  let database = new Database();
  database.query(`SELECT
  id, naziv_lokacije, pozicija
 FROM bot_locations
  `)
    .then( (locations) =>{
      database.close();
        res.status(200).json({
          message: 'Success',
          data: locations
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
        messgae: 'Could not retrive locations',
        error : err
      });
    });
});
router.get('/articles/:id', checkAuth,
(req, res, next) =>{
  let database = new Database();
  database.query(`SELECT
  article_id, location_id, name, indeks
  FROM bot_location_articles
  left join articles on articles.id = bot_location_articles.article_id
  where location_id = ?
  order by indeks`, req.params.id )
    .then( (articles) =>{
      database.close();
        res.status(200).json({
          message: 'Success',
          data: articles
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
      naziv_lokacije : req.body.location_name,
      pozicija: req.body.position,
    };
    database.query(`INSERT INTO bot_locations SET ?`, [jsonMaster])
    .then((results) =>{
      insertId = results.insertId;
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
    database.query(`UPDATE bot_locations SET
    naziv_lokacije = ?,
    WHERE id = ?`, [
      req.body.location_name,
      req.params.id] )
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
      database.query('DELETE FROM bot_locations WHERE id = ?', req.params.id )
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
