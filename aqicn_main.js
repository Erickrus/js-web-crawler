var http    = require("http");
var mysql   = require('mysql');
var crawler = require("./basic-crawler");
var util    = require("./util");
var aqicn   = require("./aqicn");

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'secret',
    database:'chinaaqi',
    port: 3306
});

function processQuery(conn, sql) {
   conn.query(sql, function(err, rows, fields) {
      if (err) throw err;
   });
}

function processData(data) {
     if (data) {
       jsArray = aqicn.aqiGetJson(data);
       for (var i=0;i<jsArray.length;i++) {
       	  var dataItem = jsArray[i];
          if (dataItem.aqi=="-") continue;
          var sql = aqicn.aqiFormatSql(dataItem);
          console.log(dataItem.city+":"+dataItem.aqi);
          processQuery(conn, sql);
       }
     } else {
       console.log("error");
     }
}


function crawl() {
      crawler.download(aqicn.aqiFormatUrl(), 
         processData
      );
}

proxy         = "172.31.1.246";
proxy_port    = "8080";
proxy_enabled = true;

t=setInterval(crawl, 15*60*1000);
