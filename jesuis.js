#!/usr/bin/env node
var JSONSearch = require('./lib/jsonSearch');
var JeSuis = {};
JeSuis.start = function(json, searchValue) {
	var jsonSearch = new JSONSearch(json, searchValue);
}

module.exports = JeSuis;