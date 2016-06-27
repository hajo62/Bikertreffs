// //var mycloudant = require('../mycloudant.js');
var cradle = require('cradle');
var connection;

// read env from local file or CF Environment
// http://blog.ibmjstart.net/2015/08/31/abstracting-out-environment-variables-for-bluemix/
var vcapServices = require('../vcapservices.js');

// some vars from Cloudant
var cloudantHost = vcapServices.cloudantNoSQLDB[0].credentials.host;
var cloudantPort = vcapServices.cloudantNoSQLDB[0].credentials.port;
var cloudantUser = vcapServices.cloudantNoSQLDB[0].credentials.username;
var cloudantPassword = vcapServices.cloudantNoSQLDB[0].credentials.password;

// Connect to the database
connection = new(cradle.Connection)('https://' + cloudantHost, cloudantPort, {
  cache: true,
  secure: true,
  raw: false,
  auth: { username: cloudantUser, password: cloudantPassword }
});
db = connection.database(dbName);
db.exists(function(err, exists){
  if(err){
    console.log('Error accessing db' + err );
    cb(err, null);
  }
});



// Liest alle Bikertreffs über eine entsprechende View
function getBikertreffs(callback){
	db.view('bikertreffs/allBikertreffs', function (err, res) {
		if(err){
			callback(err, null);
		}
		else{
      // console.log(res.key);
      // var docs = [];
      // res.forEach(function (row){
      //   //console.log(row.key.name);
      //   //console.log(row.key.coordinates);
      // docs.push('\n' + '{"type":"Feature","properties":{"name":"' + row.key.name
      //                + '"},"geometry":{"type":"Point","coordinates":[' + row.key.coordinates + ']}}'
      //   ).toString();
      // });
      callback(null, res);
		}
	});
}

function putBikertreff(callback){
  db.save({
      force: 'dark', name: 'Darth'
  }, function (err, res) {
      console.log(res);
      callback(null, res);
  });
}

// Liest alle Bikertreffs über die Funktion getBikertreffs und baut die GeoJSON-Daten daraus zusammen.
// Das ist sicherlich noch nicht der Weisheit letzter Schluss
exports.getBikertreffs = function(req, res) {
  getBikertreffs(function(err, doc){
    if(err)
      console.log('Error reading all mutants: ' + err);
    else {
      var bikertreffsJson = '[';
      for (var i=0; i<doc.length; i++) {
        bikertreffsJson = bikertreffsJson + '{"type":"Feature","properties":{"name":"'
                                          + doc[i].key.name
                                          + '"},"geometry":{"type":"Point","coordinates":['
                                          + doc[i].key.coordinates
                                          + ']}},';
      };
      bikertreffsJson = bikertreffsJson.substring(0,bikertreffsJson.length-1) + ']';
      res.send(bikertreffsJson);
    };
  });
};

exports.putBikertreff = function(req, res) {
  putBikertreff(function(err, doc){
    if(err)
      console.log('Error writing new Bikertreff: ' + err);
    else {
      console.log(res);
    };
  });
};


exports.findById = function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
};
