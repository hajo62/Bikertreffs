var cradle = require('cradle');
var connection;
var db;

function initConnection(host, port,user, password,cb){
	//connection = new(cradle.Connection)(url, port, {
  //    auth: { username: user, password: password }
  //});
  connection = new(cradle.Connection)('https://' + host, port, {
		cache: true,
		secure: true,
		raw: false,
		auth: { username: user, password: password }
  });
	db = connection.database(dbName);
	db.exists(function(err,exists){
		if(err){
			console.log('Error accessing db' + err );
			cb(err,null);
		} else if (exists) {
	  		console.log('db ' + dbName + ' exists');
  			cb(null,'ok');
  		} else {
			  console.log('db ' + dbName + ' will be created');
			  db.create();
			  cb(null,'ok');
		  }
	});
}


function createExampleMutants(mutantName, cb){
	var inserted = 0;
	for(var i = 0; i < 10; i++) {
		db.save({
      name: mutantName + i
  	}, function (err, res) {
      if (err) {
				cb(err,null);
			}
			if (++inserted == 10) {
				cb(null, 'Mutants created');
			}
	  });
	}
}


function createViews(cb){
	db.save('_design/bikertreffs', {
    all: {
      map: function (doc) {
        if (doc.name) emit(doc.name, doc);
      }
    },
    allBikertreffs: {
      map: function (doc) {
        if (doc.properties.name) emit({name: doc.properties.name, coordinates: doc.geometry.coordinates});
        //if (doc.properties.name) emit(doc.properties.name, doc);
      }
    },
  },function (err, res) {
		if(err){
			cb(err,null);
		}
		else {
			cb(null,'Views created');
		}
	});
}


function findAll(cb){
	db.view('mutants/all', {
  },function (err, res) {
		if(err){
			cb(err,null);
		}	else {
      var docs = [];
      res.forEach(function (row) {
        docs.push( " " + row.name);
        //console.log(row.name);
      });
			cb(null, docs.length + ' Mutants read: ' + docs);
		}
	});
}


function findAllBikertreffs(cb){
	db.view('bikertreffs/allBikertreffs', {
  },function (err, res) {
		if(err){
			cb(err,null);
		}
		else{
      //console.log(res);
      var docs = [];
      res.forEach(function (row){
        //console.log(row.key.name);
        //console.log(row.key.coordinates);
      docs.push('\n' + '{"type":"Feature","properties":{"name":"' + row.key.name
                     + '"},"geometry":{"type":"Point","coordinates":[' + row.key.coordinates + ']}}'
        ).toString();
      });
      //cb(null, docs.length + ' Bikertreffs read: ' + docs);
      cb(null, docs);
		}
	});
}


function findAllBikertreffs2(cb){
	db.view('bikertreffs/allBikertreffs', {
  },function (err, res) {
		if(err){
			cb(err,null);
		}
		else{
      //console.log(res);
      var docs = [];
      res.forEach(function (row){
        //console.log(row.key.name);
        //console.log(row.key.coordinates);
      docs.push('\n' + '{"loc":[' + row.key.coordinates + '], '
                     + '"title": ' + row.key.name + '}'
        ).toString();
      });
      console.log(docs);
      cb(null, docs);
		}
	});
}


module.exports = {
	initConnection: initConnection,
	createExampleMutants: createExampleMutants,
	createViews: createViews,
  findAll: findAll,
  findAllBikertreffs: findAllBikertreffs,
  findAllBikertreffs2: findAllBikertreffs2
};
