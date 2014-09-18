var charsets = new Array(
  "K","0", "C","1", "P","2", "*","3",
  "~","4", "$","5", "6","6", "%","7",
  "#","8", ":","9");

function amTranslate(ch) {
  for (var i=0;i<charsets.length/2;i++) {
    if (ch == charsets[i*2]) {
      return charsets[i*2+1];
    }
  }
  return "";
}

function amConvert(sLines, mask) {
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
  	          var n = amTranslate(line.charAt(j));
  	        if (n=="") result+= ".";
  	        else result += amTranslate(line.charAt(j));
  	    } else {
  	       result += line.charAt(j);
  	    }
     } else {
  	       var n = amTranslate(line.charAt(j));
  	     if (n=="") result+= line.charAt(j);
  	     else result += amTranslate(line.charAt(j));
     }
  	 }
  	 result += "\n";
  	}
  }
  return result;
}

amType= new Array(
  "ALUMINUM","BRL","CAD","CHF","CNY","COPPER","DJIA","EUR","GBP","GOLD4USD",
  "GOLDB1M","GOLDB1Y","GOLDB6M","HKD","HUI","INR","JPY","JSEGOLD","KDX","KGX",
  "KPX","KRX","KSX","LEAD","LFGOLDAM4USD","LFGOLDPM4USD","LFPALLADIUMAM4USD",
  "LFPALLADIUMPM4USD","LFPLATINUMAM4USD","LFPLATINUMPM4USD","LFSILVER4USD",
  "MXN","NASDAQ","NICKEL","NIKKEI","NYSE","OIL","PALLADIUM4USD","PALLADIUMB1M",
  "PALLADIUMB1Y","PALLADIUMB6M","PLATINUM4USD","PLATINUMB1M","PLATINUMB1Y",
  "PLATINUMB6M","RHODIUM4USD","RUB","RUSSELL","SHMCALUMINUM","SHMCCOPPER",
  "SHMCLEAD","SHMCNICKEL","SHMCZINC","SHMINDEX","SILVER4USD","SILVERB1M",
  "SILVERB1Y","SILVERB6M","SP500","TSX","USDX","XAU","ZAR","ZINC"
);

function amFormatUrl(sAmType){
	return "http://charts.kitco.com/KitcoCharts/RequestHandler?requestName=getSymbolHistoricalLiveChart&Symbol="+sAmType;
}

function amFormatSql(line, curr_code){
   var cells = line.split(",");
   var ts= cells[0];
   var val=cells[1];
   if (val.length ==0) val= "NULL";
   var sql= "INSERT INTO kitco.TBL_CURNCY_FCT(CURNCY_TYPE, CURNCY_TIME, CURNCY_VALUE, UPDATE_TS)"+
            "   VALUES('"+curr_code+"', STR_TO_DATE('"+ts+"','%Y-%m-%d %H:%i:%s'), "+val+", CURRENT_TIMESTAMP)"+
            "   ON DUPLICATE KEY UPDATE CURNCY_VALUE = "+val+", UPDATE_TS = CURRENT_TIMESTAMP;"
   return sql;
}


exports.amConvert  =amConvert;
exports.amType     =amType;
exports.amFormatUrl=amFormatUrl;
exports.amFormatSql=amFormatSql;
