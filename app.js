global.dbName = 'bikertreffs';
var express = require('express');
var routes = require('./routes/index');
var bikertreffs = require('./routes/bikertreffs');
var path = require('path');
// if in cloud read port from cloud env or use 3000 on local
var port = process.env.PORT || 3000;



var app = express();

// Ermöglicht den Zugriff auf die Scripte in routes
app.use('/', routes);

app.post('/form', function(req, res) {
  res.send("Form hat gesendet...");
  console.log("Form hat gesendet...");
});


// Hier stimmt was nicht mit dem Pfad
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/node_modules')));

app.use('/scripts', express.static(path.join(__dirname, 'node_modules')));

app.get('/getBikertreffs', bikertreffs.getBikertreffs);
// app.get('/bikertreffs/:id', bikertreffs.findById);

app.get('/bikertreffs', function(req, res) {
   res.sendFile(path.join(__dirname + '/public/bikertreff.html'));
});

app.get('/control', function(req, res) {
   res.sendFile(path.join(__dirname + '/public/Bikertreff2.html'));
});

// app.get('/putBikertreff', bikertreffs.putBikertreff, {port});
/* GET New User page. */
// app.post('/form', function(req, res) {
//     res.sendFile(path.join(__dirname + '/public/form.html'));
// });


// app.post('/form', function(req, res) {
//
// });


// app.get('/*', function(req, res) {
//    res.sendfile(__dirname + '/public/bikertreff.html');
// });

app.listen(port);
