var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 1000,
  host: "localhost",
  port : "9001",
  user: "root",
  password: "Prima12%Vera",
    database: "canvas"

})
var dbParameters = require('./dbSettings');
exports.executeQuery = function(sql, callback){
var con1 = mysql.createConnection(dbParameters.dbDetails);
  con1.connect(function(err) {
    console.log(sql);
    if (err) throw err;
    con1.query(sql, function (err, result) {
      if (err) throw err;
      callback(err, result);
    });
  })
};
