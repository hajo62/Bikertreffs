var fs = require('fs');

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
    dbCredentials.url = vcapServices.cloudantNoSQLDB[0].credentials.url;
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
  } else {
    var localCredential = require(__dirname+'/config/cloudant_Credentials');
    dbCredentials.host = localCredential.host;
    dbCredentials.port = localCredential.port;
    dbCredentials.user = localCredential.user;
    dbCredentials.password = localCredential.password;
    dbCredentials.url = localCredential.url;
    dbCredentials.dbName = localCredential.dbName;
    console.log('>>>>> Lokal mit Bluemix CloudantDB <<<<<');
  }
} 

module.exports = dbCredentials;
