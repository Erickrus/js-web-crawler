mysqlConf = {
    host: 'localhost',
    user: 'root',
    password: 'secret',
    database:'aqicn',
    port: 3306
};

proxy_enabled = false;
proxy         = "172.31.1.246";
proxy_port    = "8080";


function loadConfig() {
  proxy_enabled = false;
  proxy         = "172.31.1.246";
  proxy_port    = "8080";

  mysqlConf = {
    host: 'localhost',
    user: 'root',
    password: 'secret',
    database:'aqicn',
    port: 3306
  };
}

exports.loadConfig = loadConfig;
