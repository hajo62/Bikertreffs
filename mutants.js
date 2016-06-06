global.dbName = 'mutants';
var express = require('express');
var mycloudant = require('./mycloudant.js');
// read env from local file or CF Environment
// http://blog.ibmjstart.net/2015/08/31/abstracting-out-environment-variables-for-bluemix/
var vcapServices = require('./vcapservices.js');
// if in cloud read port from cloud env or use 3000 on local
var port = process.env.PORT || 3000;

// some vars from Cloudant
var cloudantHost = vcapServices.cloudantNoSQLDB[0].credentials.host;
var cloudantPort=vcapServices.cloudantNoSQLDB[0].credentials.port;
var cloudantUser=vcapServices.cloudantNoSQLDB[0].credentials.username;
var cloudantPassword=vcapServices.cloudantNoSQLDB[0].credentials.password;

var app = express();


mycloudant.initConnection(cloudantHost, cloudantPort, cloudantUser, cloudantPassword, function(err,ret){
  if(err)
    console.log(err);
  else{}
});


app.get('/NewMutants', function(req, res1) {
  mycloudant.createExampleMutants('Hajo',function(err, res2){
    if(err)
         console.log('Could not create mutants ' + err);
      else
         console.log('>>>' + res2);
    });
  res1.send('New mutants created: ');
})


app.get('/ReadMutants', function(req, res) {
  mycloudant.findAll(function(err, doc){
    if(err)
      console.log('Error reading all mutants: ' + err);
    else {
      //console.log(doc);
      res.send(doc);
    };
  });
});


app.listen(port);
