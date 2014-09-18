var http    = require("http");
var mysql   = require('mysql');
var amstock = require("./amstock");
var crawler = require("./basic-crawler");
var util    = require("./util");
var config  = require("./config");

config.loadConfig();

function processQuery(conn, sql) {
   conn.query(sql, function(err, rows, fields) {
      if (err) throw err;
   });
}

function processData(data) {
     if (data) {
       //console.log(data);
       //console.log(amstock.amConvert(data, "YYYY-MM-DD hh:mm:ss"));
       var curr_ts = util.formatDatetime(new Date());
       var curr_code = mainCode[mainCodeId%mainCode.length];
       var converted = amstock.amConvert(data, "YYYY-MM-DD hh:mm:ss");
       
       //util.saveToFile("data/"+curr_code+"_"+ curr_ts +".csv", converted);
       var lines = converted.split("\n");
       for (var i=0;i<lines.length;i++) {
         var line = lines[i];
         if (line.length>0) {
            var sql= amstock.amFormatSql(line, curr_code);
            processQuery(conn, sql);
            //console.log(sql);
         }
       }
     } else {
       console.log("error");
     }
}



var mainCode = new Array(
   "BRL", "CAD", "CHF", "CNY", "EUR", "GBP", "HKD", "INR", "JPY",
   "RUB", "MXN", "XAU", "ZAR", "NASDAQ", "NYSE", "SP500", "OIL",
   "GOLD4USD", "SILVER4USD"
);

var mainCodeId=-1;

function crawl() {
	 mainCodeId++;
	 var n = Math.floor(mainCodeId/ mainCode.length, 0);
	 
	 if(n%12 == 0){ //every 2 hours capture the data
	    console.log(util.formatDatetime(new Date())+" : "+mainCode[mainCodeId%mainCode.length]);
      crawler.download(amstock.amFormatUrl(mainCode[mainCodeId%mainCode.length]), 
         processData
      );
   }
}

var conn = mysql.createConnection(mysqlConf);
conn.connect();

//every 10 minutes execute all the crawl codes
t=setInterval(crawl, 10*60*1000 / mainCode.length);


