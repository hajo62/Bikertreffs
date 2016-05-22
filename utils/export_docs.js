console.log("Exportieren alles Docs\n");
var cradle = require('../node_modules/cradle'); // Driver for node.js Couchdb/Cloudantdb
var dbCredentials = require('../dbCredentials.js');	// login information to databases

// Connection to database: 
// - local couchdb - for local test 
// - bluemix cloudant - for 'production'
if (dbCredentials.user == '') {
  var connection = new(cradle.Connection)(dbCredentials.host, dbCredentials.port, {});
  var db = connection.database(dbCredentials.dbName);
} else {
    db = new (cradle.Connection)(dbCredentials.host, 
      {auth:{username: dbCredentials.user, password: dbCredentials.password}}).database(dbCredentials.dbName);
};

var fs = require('fs');

console.log("Mit der Datenbank verbunden...");

var count = 0;
var resString = '';
var path = process.argv[2];
var fileName = '';

// Get all documents with the built-in 'All' view
db.all({include_docs:true}, function(err, docs) {

  if (err) {
    console.log('Error: %s', err);
  } else {
    // Loop all found documents
    Object.keys(docs).forEach(function(key) {
      // Create the geoJSON like string
      resString = '{"type":"Feature","properties":{"name":"' 
                +  docs[key].doc.properties.name + '"},\n' 
                +  '"geometry":{"type":"Point","coordinates":[' 
                +  docs[key].doc.geometry.coordinates + ']}}';
      fileName = '' + (parseInt(key) + 1);
      while(fileName.length < 3)
        fileName="0" + fileName;
      fileName = path + '/export_' + fileName + '.json';
      console.log(fileName);
      
      fs.writeFile(fileName, resString, function(err) {
        if(err) {
            return console.log(err);
        }
      }); 
    }); // End Object.keys(docs).forEach(function(key)
  }; // End if (err)
}); // End db.all({include_docs:true}, function(err, docs) 
console.log('Ende getBikertreffs()\n');



