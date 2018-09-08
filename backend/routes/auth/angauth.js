const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const databaseconfig = require('../../config/databaseconnection')
const databaseconnection = databaseconfig.getDBconnection();

// router.use('/',(req, res, next) => {
//   res.json({
//     message : 'Success',
//     artikli : {'sss': '111'}
//   })
// });

router.post('/login', (req, res, next) =>{
  databaseconnection.query(`SELECT id, username, passkey FROM ugo.users where username = ?`, req.body.username,
    (error, korisnik) => {
          if(error) {
              return res.status(500).json({
                  title: 'An error has occured',
                  error : error
              });
          }

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
    }
  )
});

module.exports = router;
