console.log("Importieren alles Docs\n");
var cradle = require('../node_modules/cradle'); // Driver for node.js Couchdb/Cloudantdb
var dbCredentials = require('../dbCredentials.js');	// login information to databases

// Connection to database: 
db = dbCredentials, function(err, docs) {
  if (err) {
    console.log('My Error: %s', err);
  }
}

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







