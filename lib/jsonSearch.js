#!/usr/bin/env node
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
var agg = [], termsKeys = [], termsValues = [];

function JSONSearch(node, matchTerm) {
	new Node(node, 'root', 
			['root'], [], matchTerm, termsKeys, termsValues);
	this.recursiveNode('root');
};

JSONSearch.prototype.recursiveNode = function(parent) {
	this.parent = parent;
	if (this.isArray(this.node)) {
		this.handleArray(this.node);
	} else if (this.isObject(this.node)) {
		this.handleObject(this.node);
	} else {
		this.evaluatePrimitive(this.node);
	};
};

JSONSearch.prototype.evaluatePrimitive = function() {
	if (this.match !== undefined && 
		this.value !== undefined && 
		this.value === this.match) {
		agg.push(this);
	};
};

JSONSearch.prototype.isPrimitive = function(val) {
	return (!(_.isObject(val)) && !(_.isArray(val)));
};

JSONSearch.prototype.isObject = function(val) {
	return val instanceof Object;
};

JSONSearch.prototype.isArray = function(val) {
	return val instanceof Array;
};

module.exports = JSONSearch;
var Node = require('./node');
var Primitive = require('./primitive');

JSONSearch.prototype.evaluateObject = function(object) {
	if (_.isEqual(object, this.match)) {
		agg.push(this);
	} else if (this.isArray(object)) {
		var was = this;
		object.forEach(function(v, idx) {
			if (was.isObject(v)) new Node(v, was, was.ancestors, 
				was.matches, was.match, termsKeys, termsValues);
		});
	} else {
		for (var key in object) {
			// reconstruct object for eval, else counts as primitive
			var o = {};
			o[key] = object[key]
			if (_.isEqual(this.match, o)) {
				agg.push(this);
			} else {
				if (this.isObject(object[key])) {
					new Node(
					object[key], this, this.ancestors, 
					this.matches, this.match, termsKeys, termsValues);
				};
			};
		};
	};
	termsKeys.forEach(function(t, idx) {
		if (_.isEqual(t, object)) {
			termsKeys.splice(idx, 1);
			return;
		}
	});
	if (termsKeys.length === 0) {
		emitter.emit('fin');
	};
};

JSONSearch.prototype.handleObject = function(object) {
	if (this.objectSearch) return this.evaluateObject(object);
	for (var key in object) {
		if (this.isPrimitive(object[key])) new Primitive(
			object[key], this, this.ancestors, this.matches, 
			this.match, termsKeys, termsValues);
		else new Node(object[key], this, 
							this.ancestors, this.matches, this.match, 
							termsKeys, termsValues);
	};
};

JSONSearch.prototype.handleArray = function(array) {
	if (this.objectSearch) return this.evaluateObject(array);
	var was = this;
	_.flatten(array).forEach(function(v, idx) {
		if (was.isPrimitive(v)) new Primitive(
			v, was, was.ancestors, was.matches, was.match, termsKeys, 
			termsValues);
		else new Node(v, was, was.ancestors, 
			was.matches, was.match, termsKeys, termsValues);
	});
};

emitter.on('fin', function() {
	var fs = require('fs');
	var dir = './tmp';
	fs.mkdir(dir, function(err) {
		var path = './tmp/jesuis.json';
		if (fs.existsSync(path)) fs.unlinkSync(path);
		var buffer = new Buffer(JSON.stringify(agg));
		fs.open(path, 'w+', function(err, fd) {
		    if (err) throw err
		    fs.write(fd, buffer, 0, buffer.length, null, function(err) {
		        if (err) throw err;
		        console.log('found ' + agg.length + ' matches written to file.');
		        fs.close(fd, function() {
		        });
		    });
		});
	});
});
