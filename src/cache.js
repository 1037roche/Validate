'use strict';

var cache = module.exports = function (key, value) {
	return (arguments.length === 2) ? cache.set(key, value) : cache.get(key);
};

cache.storage = {};

cache.get = function (key) {
	return (key in this.storage) ? this.storage[key] : null;
};

cache.set = function (key, value) {
	this.storage[key] = value;
	return value;
};