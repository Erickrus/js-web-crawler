var util    = require("./util");

function aqiFormatSql(dataItem) {
	
   var utime=util.formatDatetime(new Date());
       utime = utime.substring(0,8);
   var utime2= dataItem.utime.substring(dataItem.utime.indexOf(" ")+1);
       if(utime2.length==4) utime2 = "0"+utime2;
       utime += utime2;
          
   var sql="INSERT INTO aqicn.TBL_AQI_CN(CITY_NAME, PRCSS_TIME, AQI_VALUE, X_VALUE, Longitude, Latitude, POL_TYPE, UPDATE_TS)"+
           "VALUES('"+dataItem.city+"', STR_TO_DATE('"+utime+"','%Y%m%d%H:%i'), "+dataItem.aqi+", "+dataItem.x+", "+dataItem.lon+", "+dataItem.lat+", '"+dataItem.pol+"', CURRENT_TIMESTAMP)"+
           " ON DUPLICATE KEY UPDATE AQI_VALUE = "+dataItem.aqi+", UPDATE_TS = CURRENT_TIMESTAMP;";
   return sql;
}

function aqiGetJson(data) {
   var jsfile = data.substring(data.indexOf("mapShowLevel2Makers(")+20);
     	 jsfile=jsfile.substring(0,jsfile.length-4);
   var jsArray = eval(jsfile);
   return jsArray;
}

function aqiFormatUrl(){
	return "http://waqi.aqicn.org/mapi/?lurlv2&z=5&jsoncallback=mapShowLevel2Makers&bounds=((3.1,%2073.13650431249994),%20(54.1,%20136.49490274999994))&dyn";
	//return "http://aqicn.org/map/";
}

exports.aqiFormatSql = aqiFormatSql;
exports.aqiGetJson   = aqiGetJson;
exports.aqiFormatUrl = aqiFormatUrl;
