var express = require('express');
var router = express.Router();

/*
 * GET home page.
 */

 router.get('/form', function(req, res) {
   console.log('Hier bin ich');
   //console.log(res);
   res.sendFile('/public/form.html', {'root': '.'});
 });

module.exports = router;
