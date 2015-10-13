#!/usr/bin/env node
var _ = require('underscore');
var JSONSearch = require('./jsonSearch');

function Node(node, parent, ancestors, matches, matchTerm, termsKeys, termsValues) {
	if (this.isObject(matchTerm)) this.objectSearch = true;
	this.node = node;
	this.ancestors = ancestors;
	console.log()
	if (parent && this.ancestors.indexOf(node) === -1 && 
		JSON.stringify(node).indexOf(JSON.stringify(matchTerm)) > -1) this.ancestors.push(node);
	this.matches = this.matches || node;
	this.match = matchTerm;
	var was = this;
	if (was.isArray(node)) {
		if (termsKeys.indexOf(node) === -1) {
			termsKeys.push(node)
			var f = _.flatten(node);
			var c = f.length;
			f.forEach(function(v) {
				if (was.isObject(v)) c-=1;
			});
			termsValues.push(c);
		}
	} else {
		if (termsKeys.indexOf(node) === -1) {
			termsKeys.push(node)
			var c = Object.keys(node).length;
			
			for (var key in node) {
				if (was.isObject(node[key])) {
					c-=1;
				};
			}

			termsValues.push(c);
		}
	}

	this.recursiveNode();
};

Node.prototype = Object.create(JSONSearch.prototype);

module.exports = Node;