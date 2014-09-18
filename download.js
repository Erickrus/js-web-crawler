var http = require("http"); 

var proxy="172.31.1.246";
var proxy_port="8080";


var charsets = new Array(
  "K","0", "C","1", "P","2", "*","3",
  "~","4", "$","5", "6","6", "%","7",
  "#","8", ":","9");


function translate(ch) {
  for (var i=0;i<charsets.length/2;i++) {
    if (ch == charsets[i*2]) {
      return charsets[i*2+1];
    }
  }
  return "";
}

function convert(sLines, mask) {
  var lines = sLines.split("\n");
  var result = "";
  for (var i=0;i<lines.length;i++) {
  	 var line = lines[i];
  	 if (line != "") {
  	 for (var j=0;j<line.length;j++) {
     if (j<mask.length) {
           if (mask.charAt(j) == 'D' ||
  	        mask.charAt(j) == 'Y' ||
  	        mask.charAt(j) == 'M' ||
  	        mask.charAt(j) == 'h' ||
  	        mask.charAt(j) == 'm' ||
  	        mask.charAt(j) == 's') {
  	          var n = translate(line.charAt(j));
  	        if (n=="") result+= ".";
  	        else result += translate(line.charAt(j));
  	    } else {
  	       result += line.charAt(j);
  	    }
     } else {
  	       var n = translate(line.charAt(j));
  	     if (n=="") result+= line.charAt(j);
  	     else result += translate(line.charAt(j));
     }
  	 }
  	 result += "\n";
  	}
  }
  return result;
}


function download(url, useProxy, callback) {
  var options;

  if (useProxy) {
    options = {
       host: proxy,
       port: proxy_port,
       path: url,
       headers: {
          // Remove http://, make sure only accept protocol of http
          Host: getHost(url)
       }
    };
  } else {
    options = url;
  }

  http.get(options, function(res) {
    var data = "";

    res.on('data', function (chunk) {
      data += chunk;
    });

    res.on("end", function() {
      callback(data);
    });
  }).on("error",function() {
    callback(null);
  });
}


suffix= new Array
("ALUMINUM","BRL","CAD","CHF","CNY","COPPER","DJIA","EUR","GBP","GOLD4USD",
"GOLDB1M","GOLDB1Y","GOLDB6M","HKD","HUI","INR","JPY","JSEGOLD","KDX","KGX",
"KPX","KRX","KSX","LEAD","LFGOLDAM4USD","LFGOLDPM4USD","LFPALLADIUMAM4USD",
"LFPALLADIUMPM4USD","LFPLATINUMAM4USD","LFPLATINUMPM4USD","LFSILVER4USD",
"MXN","NASDAQ","NICKEL","NIKKEI","NYSE","OIL","PALLADIUM4USD","PALLADIUMB1M",
"PALLADIUMB1Y","PALLADIUMB6M","PLATINUM4USD","PLATINUMB1M","PLATINUMB1Y",
"PLATINUMB6M","RHODIUM4USD","RUB","RUSSELL","SHMCALUMINUM","SHMCCOPPER",
"SHMCLEAD","SHMCNICKEL","SHMCZINC","SHMINDEX","SILVER4USD","SILVERB1M",
"SILVERB1Y","SILVERB6M","SP500","TSX","USDX","XAU","ZAR","ZINC");

var url = "http://charts.kitco.com/KitcoCharts/RequestHandler?requestName=getSymbolHistoricalLiveChart&Symbol=SP500";


function getHost(url) {
   var sUrl = url.substring(7);
   if(sUrl.indexOf("/")>=0) {
      sUrl = sUrl.substring(0, sUrl.indexOf("/"));
   }
   return sUrl;
}

download(url, false, 
   function(data) {
     if (data) {
       //console.log(data);
       console.log(convert(data, "YYYY-MM-DD hh:mm:ss"));
     } else {
       console.log("error");
     }
});
