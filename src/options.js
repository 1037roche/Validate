/* jshint -W097 */
'use strict';

// External modules
var cache = require('./cache');

// Verifies that the token is empty
var isEmpty = function (value) {
	return (undefined === value || null === value || '' === value);
};

// Get and set the configuration object
var options = module.exports = function (key, value) {
	return (arguments === 2) ? options.set(key, value) : options.get(key);
};

// Default
options.data = {

	// Default callback
	callback : function () {
		cache(this.id).style.border = '1px solid #e74c3c';
	},

	// Default constraint
	constraint : 'data-constraint',

	// Default message
	message : {}
};

// Get configuration item
options.get = function (key) {
	return (key in this.data) ? this.data[key] : null;
};

// Set configuration item
options.set = function (key, value) {
	if (!isEmpty(value)) {
		this.data[key] = value;
		return value;
	}
};

// Initializes the default configuration object
options.init = function (configuration) {
	configuration = configuration || {};
	this.set('message', configuration.message);
	this.set('callback', configuration.callback);
	this.set('constraint', configuration.constraint);
};