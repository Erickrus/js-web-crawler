
function bdtFormatUrl(d, x, y) {
	var url = "http://its.map.baidu.com:8002/traffic/TrafficTileService?level=13&x="+x+"&y="+y+"&time="+d.getTime()+"&label=web2D&v=036";
	return url;
}

exports.bdtFormatUrl = bdtFormatUrl;

