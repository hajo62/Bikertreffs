console.log("Importieren alles Docs\n");
var cradle = require('../node_modules/cradle'); // Driver for node.js Couchdb/Cloudantdb
var dbCredentials = require('../dbCredentials.js');	// login information to databases

// Connection to database: 
// - local couchdb - for local test 
// - bluemix cloudant - for 'production'

db = new (cradle.Connection)('1d695de8-aed7-4184-9249-d5d558688767-bluemix.cloudant.com', {auth:{username: '1d695de8-aed7-4184-9249-d5d558688767-bluemix', password: '0febe405741d03f1c4ccb6fabf3a86f328afdcc3aa322ca92d906eb645dd835f'}}).database('bikertreffs');

var fs = require('fs');
var path = process.argv[2];
var content = '';

fs.readdir(path, function(err, items) {
  for (var i=0; i<items.length; i++) {
    // console.log(process.argv[2] + '/' + items[i]);
    content = fs.readFileSync(process.argv[2] + '/' + items[i], 'utf-8');  
    //console.log(content); 

    db.save(JSON.parse(content), function(err) {
      if (err) {console.log(err)}
    });
  }
});







