#!/usr/bin/env node
var assert = require('assert');
var fs = require('fs');
var jesuis = require('./jesuis');
var dir = './tmp';
var path = './tmp/jesuis.json';

var deleteFolderRecursive = function() {
    if( fs.existsSync(dir) ) {
        fs.readdirSync(dir).forEach(function(file,index){
            var curPath = dir + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(dir);
    }
};


deleteFolderRecursive();
assert.strictEqual(false, fs.existsSync(dir), 'tmp directory should not exist');
assert.strictEqual(false, fs.existsSync(dir), 'json file should not exist');

y = [{
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
    }, {
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
}]

jesuis.start(y, {b: true});
setTimeout(function() {
    fs.readFile(path, 'utf8', function(err, res) {
        assert.strictEqual(null, err, 'no error should exist to retrieve json');
        res = JSON.parse(res);
        assert.strictEqual('object', typeof res, 'typeof return should be object');
        assert.strictEqual(true, res instanceof Array, 'object should be array');
        assert.strictEqual(2, res.length, '2 matches should be returned');
        deleteFolderRecursive();
        process.exit(0);
    });
}, 1000);
