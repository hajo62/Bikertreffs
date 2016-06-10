global.dbName = 'bikertreffs';
var express = require('express');
var path = require('path');
var cradle = require('cradle');
var fs = require('fs');



//var mycloudant = require('../mycloudant.js');
// read env from local file or CF Environment
// http://blog.ibmjstart.net/2015/08/31/abstracting-out-environment-variables-for-bluemix/
var vcapServices = require('../vcapservices.js');
// if in cloud read port from cloud env or use 3000 on local
var port = process.env.PORT || 3000;

// some vars from Cloudant
var cloudantHost = vcapServices.cloudantNoSQLDB[0].credentials.host;
var cloudantPort=vcapServices.cloudantNoSQLDB[0].credentials.port;
var cloudantUser=vcapServices.cloudantNoSQLDB[0].credentials.username;
var cloudantPassword=vcapServices.cloudantNoSQLDB[0].credentials.password;

var app = express();


var connection;
var db;


	//connection = new(cradle.Connection)(url, port, {
  //    auth: { username: user, password: password }
  //});
  connection = new(cradle.Connection)('https://' + cloudantHost, cloudantPort, {
		cache: true,
		secure: true,
		raw: false,
		auth: { username: cloudantUser, password: cloudantPassword }
  });
	db = connection.database(dbName);
	db.exists(function(err,exists){
		if(err){
			console.log('Error accessing db' + err );
		} else if (exists) {
	  		console.log('db ' + dbName + ' exists');
  		} else {
			  console.log('db ' + dbName + ' will be created');
			  db.create();
		  }
	});


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
    //console.log(docs);
    // Loop all found documents
    Object.keys(docs).forEach(function(key) {
      // Create the geoJSON like string
      if (docs[key].id != '_design/mutants') {
          console.log(docs[key]);
          console.log(">>>>>" + docs[key].doc.properties.name);
          console.log(">>>>>" + docs[key].doc.geometry.coordinates + '\n\n');
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
    };
    }); // End Object.keys(docs).forEach(function(key)
  }; // End if (err)
}); // End db.all({include_docs:true}, function(err, docs)
console.log('Ende getBikertreffs()\n');
