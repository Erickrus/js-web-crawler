js-web-crawler
==============

Implement a simple web crawler based on node.js.
It is a light-weighted crawler or data extraction tools.
The data will be stored in mysql server or filesystem finally.

3 DEMOs
-------

* Baidu traffic map crawler (binary crawler ,5 min/fetch)
  * bdt_main.js      - cralwer main program
  * baidu-traffic.js - implements the main logic to process the data)
  * PNGMerge.exe     - A C# program written to support merge of 7x7 map into 1 bigger map)
  
* Kitco Forex/Metal crawler (encrypted csv crawler, 30 min/fetch)
  * Based on the recent decompile result of amstock.swf, csv parser revealed the details of the data source and format
  * amstock_main.js  - cralwer main program
  * amstock.js       - implements the main logic to translate the data

* AQICN China AQI city index crawler (json crawler, 30 min/fetch)
  * Based on the json service for rectangle area selection on longitude, latitude
  * aqicn_main.js    - cralwer main program
  * aqicn.js         - implements the utilities for the crawler



