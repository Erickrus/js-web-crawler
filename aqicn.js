var util    = require("./util");

function getCaptDatetime(dataItem) {
   var currDate=util.formatDatetime(new Date());
   currDate = currDate.substring(0,8);
       
   var captTimestamp= dataItem.utime.substring(dataItem.utime.indexOf(" ")+1);
   if (captTimestamp.length==4) {
   	  //zeroleading
   	  captTimestamp = "0"+captTimestamp;
   }

       
   var d = new Date();
   var hh=d.getHours().toString();
   var mi=d.getMinutes().toString();
   var currTimestamp = (hh[1]?hh:"0"+hh[0]) + ":"+  (mi[1]?mi:"0"+mi[0]);
   
   d.setDate(d.getDate() - 1);
   var prevDate = util.formatDatetime(d);
       prevDate = prevDate.substring(0,8);
   
   var currDateTime = currDate + captTimestamp;
   
   if (currTimestamp<captTimestamp) {
      currDateTime = prevDate + captTimestamp;
   }
   return currDateTime;
   
}

function aqiFormatSql(dataItem) {
	
   var captDatetime = getCaptDatetime(dataItem);
   var sql="INSERT INTO aqicn.TBL_AQI_CN(CITY_NAME, PRCSS_TIME, AQI_VALUE, X_VALUE, Longitude, Latitude, POL_TYPE, UPDATE_TS)"+
           "VALUES('"+dataItem.city+"', STR_TO_DATE('"+captDatetime+"','%Y%m%d%H:%i'), "+dataItem.aqi+", "+dataItem.x+", "+dataItem.lon+", "+dataItem.lat+", '"+dataItem.pol+"', CURRENT_TIMESTAMP)"+
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
