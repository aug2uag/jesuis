#!/usr/bin/env node
var JSONSearch = require('./jsonSearch');

function Primitive(val, parent, ancestors, matchTerm, termsKeys, termsValues) {
	this.value = val;
	this.ancestors = parent.ancestors;
	this.match = matchTerm;
	var _term = parent.node;
	var was = this;
	this.evaluatePrimitive();
	var index;
	termsKeys.forEach(function(t, idx) {
		if (t === _term) index = idx;
		return;
	});
	termsValues[index] -= 1;

	var finished = true;
	termsValues.forEach(function(v) {
		if (v !== 0) {
			finished = false;
			return;
		};
	});

};

Primitive.prototype = Object.create(JSONSearch.prototype);

module.exports = Primitive;