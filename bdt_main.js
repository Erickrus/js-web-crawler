var http    = require("http");
var bdt     = require("./baidu-traffic");
var crawler = require("./basic-crawler");
var util    = require("./util");
var config  = require("./config");


config.loadConfig();
curr_ts = new Date();
last_ts = new Date();
curr_x = 0;
curr_y = 0;


function processData(data) {
     if (data) {
       util.saveToBinaryFile("data/"+util.formatDatetime(curr_ts)+"_"+curr_x+"_"+curr_y+".png", data);
     } else {
       console.log("error");
     }
}

mapId = -1;
function crawl() {
	mapId++;
	var currMapId = mapId % 42;
	var currMapTest = Math.floor(mapId / 42);
  currMapTest = (currMapTest % 5==0);

  if (currMapId==0) curr_ts = new Date();
	curr_x= Math.floor(currMapId/7) + 1648;
	curr_y= Math.floor(currMapId%7) + 441;
	
	//x between 1648 and 1653
  //y between 442 and 447
	
	if(currMapTest) {
	  console.log( curr_ts.getTime()+":"+curr_x + "," + curr_y);
	  
	  if((curr_x==1652 && curr_y==447)||(curr_x==1653 && curr_y==447)) {
	     util.copyFile("data/000.png", "data/"+util.formatDatetime(curr_ts)+"_"+curr_x+"_"+curr_y+".png");
	     
       if (curr_x==1653 & curr_y==447) {
          setTimeout(merge, 5400);
          last_ts = curr_ts;
        }
	  } else {
       crawler.downloadBinary(bdt.bdtFormatUrl(curr_ts, curr_x, curr_y), 
         processData
       );
    }
  }
}


function merge() {
	 util.executeProcess("PNGMerge.exe "+util.formatDatetime(last_ts));
   console.log("merge("+util.formatDatetime(last_ts)+")");
   setTimeout(clean, 2400);
}

function clean() {
	util.executeProcess("del data\\"+util.formatDatetime(last_ts)+"_*.png");
	console.log("clean()");
}


t=setInterval(crawl,1100);


