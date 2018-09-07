var configValues = require('./databaseparams.json');
var mysql = require('mysql');

module.exports = {
    getDBconnection: function(){
      return con = mysql.createConnection({
	  	host : configValues.host,
  		user : configValues.user,
	  	password: configValues.password,
	  	database: configValues.database
	    });
    }
}
