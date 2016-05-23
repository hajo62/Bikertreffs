var fs = require('fs');
var cradle = require(__dirname+'/node_modules/cradle'); // Driver for node.js Couchdb/Cloudantdb


// >>>>> Für running on Bluemix noch nicht überprüft <<<<<


var dbCredentials = {
  dbName : 'bikertreffs'
};
// Prüfen, ob running on Bluemix
if(process.env.VCAP_SERVICES) {
  var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
  if(vcapServices.cloudantNoSQLDB) {
    dbCredentials.host = vcapServices.cloudantNoSQLDB[0].credentials.host;
    dbCredentials.port = vcapServices.cloudantNoSQLDB[0].credentials.port;
    dbCredentials.user = vcapServices.cloudantNoSQLDB[0].credentials.username;
    dbCredentials.password = vcapServices.cloudantNoSQLDB[0].credentials.password;
    dbCredentials.url  = vcapServices.cloudantNoSQLDB[0].credentials.url;
  } // End if(vcapServices.cloudantNoSQLDB)
  //console.log('VCAP Services: '+JSON.stringify(process.env.VCAP_SERVICES));
  console.log('>>>>> Running on Bluemix <<<<<');
} else {
  // Wenn die Datei config/local.on vorhanden ist, wird eine lokale CouchDB verwendet.
  // Wenn diese Datei fehlt, wird auch bei lokalem Test die Bluemix-CloudantDB benutzt
  if (fs.existsSync(__dirname+'/config/local.on')) {
    dbCredentials.host = 'http://localhost';
    dbCredentials.port = '5984';
    dbCredentials.user = '';
    dbCredentials.password = '';
    //console.log('Local login information: ' + JSON.stringify(dbCredentials));
    console.log('>>>>> Lokal mit lokaler CouchDB <<<<<');
    // Herstellen der DB-Verbindung 
    var connection = new(cradle.Connection)(dbCredentials.host, dbCredentials.port, {});
    var dbConnection = connection.database(dbCredentials.dbName);
  } else {
    var CloudantCredential = require(__dirname+'/config/cloudant_Credentials');
    dbCredentials.host = CloudantCredential.host;
    dbCredentials.port = CloudantCredential.port;
    dbCredentials.user = CloudantCredential.user;
    dbCredentials.password = CloudantCredential.password;
    dbCredentials.url  = CloudantCredential.url;
    console.log('>>>>> Lokal mit Bluemix CloudantDB <<<<<');
    // Herstellen der DB-Verbindung 
    var dbConnection = new (cradle.Connection)(dbCredentials.host, 
                        {auth:{username: dbCredentials.user, 
                               password: dbCredentials.password}}).database(dbCredentials.dbName);
  }
} 

// Checken, ob man die Datenbank erreichen kann
/*dbConnection.exists(function (err, exists) {
    if (err) {
      console.log('error', err);
    } else if (exists) {
      console.log('the force is with you.');
    } else {
      console.log('database does not exist.');
      throw (err);
    }
  });
*/

module.exports = dbConnection;

