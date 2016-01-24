/**
 * Created by Marko Cen on 12/31/2015.
 */

var db = require('./modules/db');
var constants = require('./modules/constants');

db.on('connected', function(){
    console.log('DB CONNECTED: ' + constants.DB_CON);
    require('./modules/config')();
});

db.open(constants.DB_CON);

