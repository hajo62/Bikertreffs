console.log("Exportieren alles Docs\n");
var cradle = require('../node_modules/cradle'); // Driver for node.js Couchdb/Cloudantdb
var dbCredentials = require('../dbCredentials.js');	// login information to databases

// Connection to database: 
db = dbCredentials, function(err, docs) {
  if (err) {
    console.log('My Error: %s', err);
  }
}

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



