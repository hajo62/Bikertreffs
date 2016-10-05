global.dbName = 'bikertreffs';
var express = require('express');
var routes = require('./routes/index');
var bikertreffs = require('./routes/bikertreffs');
var path = require('path');

// Wenn die Bluemix-Variablen gesetzt sind, Port aus dem Umgebungsvariablen lesen; sonst Port 3000 nehmen.
// if in cloud read port from cloud env or use 3000 on local
var port = process.env.PORT || 3000;

var app = express();

// Ermöglicht den Zugriff auf die Scripte in routes
app.use('/', routes);
// Hier stimmt was nicht mit dem Pfad
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/node_modules')));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules')));

// Lesen aller Bikertreffs aus der Datenbank
app.get('/getBikertreffs', bikertreffs.getBikertreffs);
// app.get('/bikertreffs/:id', bikertreffs.findById);

// Webseite mit der Karte, den Markern und der Funktion zum Darstellen von Tracks anzeigen
app.get('/bikertreffs', function(req, res) {
   res.sendFile(path.join(__dirname + '/public/bikertreff.html'));
});

// Sollte alles Pfade abfangern, die nicht vorher expliziet verwurstet sind
app.get('/*', function(req, res) {
    res.json({ message: 'Willkommen bei Hajo\'s API-Versuchen...' });
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

// Server starten und Meldung darüber ausgeben
app.listen(port);
console.log("Server gestartet auf http://127.0.0.1:"+port);
