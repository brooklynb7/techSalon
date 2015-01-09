'use strict';

var datetime = {};

Date.prototype.Format = function(fmt) {
	var o = {
		'M+': this.getMonth() + 1,
		'd+': this.getDate(),
		'h+': this.getHours(),
		'm+': this.getMinutes(),
		's+': this.getSeconds(),
		'q+': Math.floor((this.getMonth() + 3) / 3),
		'S': this.getMilliseconds()
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
	return fmt;
};
Date.prototype.Format1 = function() {
	return this.Format('yyyy-MM-dd hh:mm');
};
Date.prototype.Format2 = function() {
	return this.Format('yyyy-MM-dd hh:mm:ss');
};
Date.prototype.Format3 = function() {
	return this.Format('MM-dd');
};
Date.prototype.Format4 = function() {
	return this.Format('MM-dd hh:mm');
};
Date.prototype.Format5 = function(){
	return this.Format('yyyy-MM-dd');
};
Date.prototype.Format6 = function(){
	return this.Format('yyyy/MM/dd hh:mm');
};

module.exports = datetime;