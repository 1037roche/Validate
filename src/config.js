'use strict';

// External modules
var cache = require('./cache');
var options = require('./options');

// Regular expresion
var	reMethod = /[a-zA-Z]*/;
var	reConstraint = /@[a-zA-Z]*\([^\)]*\)/g;
var	reArguments = /[\( ]+[A-Za-z]+='[^']*/g;

// Obtained by the method and arguments
var get = function (id, attr) {
	var verify = [];
	attr.replace(reConstraint, function (constraint) {
		constraint = constraint.slice(1);

		// Get method
		var method = constraint.match(reMethod);
		method = (method !== null) ? method.shift() : '';

		// Get arguments
		var param = {};
		constraint.replace(reArguments, function (args) {
			args = args.slice(1).split('=\'');
			param[args[0]] = args[1];
		});

		// Groups validations
		verify.push({
			constraint : method,
			arguments : param
		});
	});

	// Add validation
	if (verify.length > 0) {
		options('validate', {
			id : id,
			verify : verify
		});
	}
};

// Validation prepared
var config = module.exports = function () {
	// Build Selector
	var constraint = options('constraint');
	var selector = 'form[' + constraint + '],input[' + constraint + '],' +
				   'select[' + constraint + '],textarea[' + constraint + ']';

    // Gets the items to validate
	config.checked = true;
	var nodes = window.document.querySelectorAll(selector);
	[].forEach.call(nodes, function (node) {
		node.id = node.id || constraint + '-' + Math.floor(9999 * Math.random());
		cache(node.id, node);
		get(node.id, node.getAttribute(constraint));
	});
};

//
config.checked = false;