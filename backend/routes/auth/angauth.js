const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Database = require('../../config/database');
const database = new Database();

router.post('/login', (req, res, next) =>{
  database.query(`SELECT id, username, passkey FROM users where username = ?`, req.body.username)
    .then( (korisnik) => {
          if (korisnik.length == 0){// Is there a user
            return res.status(401).json(
              {message: 'Authorization failed'}
            )
          }
          if(korisnik[0].passkey != req.body.password){// Is the password correct
            return res.status(401).json(
              {message: 'Authorization failed'}
            )
          }
          const token = jwt.sign(
            {username: korisnik.username, id: korisnik.id},
            'secret_this_should_be_longer_than_this',
            {expiresIn: '1h'}
          );
          res.status(200).json({
              token: token,
              expiresIn: 3600
            });
    }).catch( err => {
      return res.status(500).json({
        message: 'Authorization failed',
        error : err
      });
    });;
});

module.exports = router;
