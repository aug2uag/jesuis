#!/usr/bin/env node
var jesuis = require('./jesuis');

var y = {
	x: [1,2,[3,4], 5],
	y: {
		a: 2,
		b: true,
		c: 'foo',
		d: {
			j: [1,2,[3,4], [5,{k:3}]],
			k: false
		}
	},
	z: {
		q: 1
	}
}

jesuis.start(y, {b: true});
