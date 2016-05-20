
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('../views/bikertreff.html', { title: 'Hajos Bikertreff-Verzeichnis' });
};
