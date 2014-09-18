var http = require("http"); 

proxy="172.31.1.246";
proxy_port="8080";
proxy_enabled=false;


function getHost(url) {
   var sUrl = url.substring(7);
   if(sUrl.indexOf("/")>=0) {
      sUrl = sUrl.substring(0, sUrl.indexOf("/"));
   }
   return sUrl;
}

function download(url, callback) {
  var options;

  if (proxy_enabled) {
    options = {
       host: proxy,
       port: proxy_port,
       path: url,
       headers: {
          // Remove http://, make sure only accept http protocol
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



function downloadBinary(url, callback) {
  var options;

  if (proxy_enabled) {
    options = {
       host: proxy,
       port: proxy_port,
       path: url,
       headers: {
          // Remove http://, make sure only accept http protocol
          Host: getHost(url)
       }
    };
  } else {
    options = url;
  }

  http.get(options, function(res) {
    var data = [];

    res.on('data', function (chunk) {
      data.push(chunk)
    });

    res.on("end", function() {
    	data = Buffer.concat(data);
      callback(data);
    });
    
  }).on("error",function() {
    callback(null);
  });
}

exports.download       =download;
exports.downloadBinary =downloadBinary;
