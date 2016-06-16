global.dbName = 'bikertreffs';
var express = require('express');
    bikertreffs = require('./routes/bikertreffs');
var path = require('path');
// if in cloud read port from cloud env or use 3000 on local
var port = process.env.PORT || 3000;

var app = express();

// Hier stimmt was nicht mit dem Pfad
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules')));

app.get('/getBikertreffs', bikertreffs.getBikertreffs);
// app.get('/bikertreffs/:id', bikertreffs.findById);

app.get('/bikertreffs', function(req, res) {

   res.sendFile(path.join(__dirname + '/public/bikertreff.html'));
});

app.get('/*', function(req, res) {
   res.sendfile(__dirname + '/public/bikertreff.html');
});

app.listen(port);
