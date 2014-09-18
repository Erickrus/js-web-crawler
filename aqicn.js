var util    = require("./util");

function aqiFormatSql(dataItem) {
	
   var utime=util.formatDatetime(new Date());
       utime = utime.substring(0,8);
   var utime2= dataItem.utime.substring(dataItem.utime.indexOf(" ")+1);
       if(utime2.length==4) utime2 = "0"+utime2;
       utime += utime2;
          
   var sql="INSERT INTO aqicn.TBL_AQI_CN(CITY_NAME, PRCSS_TIME, AQI_VALUE, X_VALUE, Longitude, Latitude, UPDATE_TS)"+
           "VALUES('"+dataItem.city+"', STR_TO_DATE('"+utime+"','%Y%m%d%H:%i'), "+dataItem.aqi+", "+dataItem.x+", "+dataItem.g[1]+", "+dataItem.g[0]+", CURRENT_TIMESTAMP)"+
           " ON DUPLICATE KEY UPDATE AQI_VALUE = "+dataItem.aqi+", UPDATE_TS = CURRENT_TIMESTAMP;";
   return sql;
}

function aqiGetJson(data) {
   var jsfile = data.substring(data.indexOf("mapInitWithData(")+16);
     	 jsfile=jsfile.substring(0,jsfile.length-27)
   var jsArray = eval(jsfile);
   return jsArray;
}

function aqiFormatUrl(){
	return "http://aqicn.org/map/";
}

exports.aqiFormatSql = aqiFormatSql;
exports.aqiGetJson   = aqiGetJson;
exports.aqiFormatUrl = aqiFormatUrl;
