/* jshint -W097 */
'use strict';

// External modules
var exception = require('./exception')('cache');

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
	if (key in this.storage) {
		throw exception('id', 'Identifier {0} is duplicated', key);
	}
	
	// Assigns the element
	this.storage[key] = value;
	return value;
};