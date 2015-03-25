/* jshint -W097 */
'use strict';

// Get and set element of the object cache
var cache = module.exports = function (key, value) {
	return (arguments.length === 2) ? cache.set(key, value) : cache.get(key);
};

// Object storage
cache.storage = {};

// Get element of the object cache
cache.get = function (key) {
	return (key in this.storage) ? this.storage[key] : null;
};

// Set element of the object cache
cache.set = function (key, value) {
	this.storage[key] = value;
	return value;
};