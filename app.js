global.dbName = 'bikertreffs';
var express = require('express');
var path = require('path');
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
// Hier stimmt was nicht mit dem Pfad
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules')));

mycloudant.initConnection(cloudantHost, cloudantPort, cloudantUser, cloudantPassword, function(err,ret){
  if(err)
    console.log(err);
  else{
    console.log('Now creating views...');
    mycloudant.createViews(function(err,ret){});
  }
});


app.get('/bikertreffs', function(req, res) {
  res.sendfile('./public/bikertreff.html');
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
  mycloudant.findAllBikertreffs(function(err, doc){
    if(err)
      console.log('Error reading all mutants: ' + err);
    else {
      console.log(doc);
      res.send(doc);

      var fs = require("fs");
      fs.writeFile('./public/bikertreffs.geoJson', '['+doc+']', function (error) {

    });
    };
  });
});

app.get('/OldReadMutants', function(req, res) {
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
