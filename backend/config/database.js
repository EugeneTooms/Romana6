const mysql = require( 'mysql' );
const configValues = require('./databaseparams.json');

module.exports = class Database {
    constructor() {
        this.connection = mysql.createConnection(configValues);
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
              if ((this.connection.state) === 'disconnected' ) {
                return reject( 'disconnected' );
              }
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}
