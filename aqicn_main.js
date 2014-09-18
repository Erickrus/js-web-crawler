var http    = require("http");
var mysql   = require('mysql');
var crawler = require("./basic-crawler");
var util    = require("./util");
var aqicn   = require("./aqicn");
var config  = require("./config");

config.loadConfig();

var conn = mysql.createConnection(mysqlConf);

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

crawl();
t=setInterval(crawl, 15*60*1000);

