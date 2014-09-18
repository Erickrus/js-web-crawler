var fs = require('fs');

function saveToFile(filename, s) {
  fs.open(filename,"w",0644,function(e,fd){
    if(e) throw e;
    fs.write(fd,s,0,'utf8',function(e){
        if(e) throw e;
        fs.closeSync(fd);
    })
  });
}

function saveToBinaryFile(filename, s) {
	var wstream = fs.createWriteStream(filename);
	wstream.write(s);
	wstream.end();
}

function formatDatetime(d) {
   var yyyy = d.getFullYear().toString();
   var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = d.getDate().toString();
   
   var hh=d.getHours().toString();
   var mi=d.getMinutes().toString();
   var ss=d.getSeconds().toString();
   
   return yyyy +""+ (mm[1]?mm:"0"+mm[0]) +""+ (dd[1]?dd:"0"+dd[0]) +""+
   (hh[1]?hh:"0"+hh[0]) + ""+  (mi[1]?mi:"0"+mi[0]) + ""+ (ss[1]?ss:"0"+ss[0]) 
   ; // padding
}

function copyFile(src, dst){
    var is = fs.createReadStream(src);
    var os = fs.createWriteStream(dst);
    is.pipe(os);
}

function executeProcess(cmd) {
    require("child_process").exec(cmd).unref();
}


exports.saveToFile = saveToFile;
exports.formatDatetime = formatDatetime;
exports.saveToBinaryFile = saveToBinaryFile;
exports.copyFile = copyFile;
exports.executeProcess = executeProcess;