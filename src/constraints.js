/* jshint -W097 */
'use strict';

// External modules
var cache = require('./cache');
var options = require('./options');
var exception = require('./exception')('constraint');

// Regular expresion
var reTypeInput	= /text|password|textarea|select-one/;

// Build response message
var message = function (label, message) {
	return message.replace('{label}', label || '');
};

// Default response
var response = function (verify) {
	verify = verify || {};
	return {
		message : verify.message || null,
		inspected : ('inspected' in verify) ? verify.inspected : false
	};
};

// The module to be exported
var constraint = module.exports = {};

// Verifies that no fields are empty
constraint.NotEmpty = function (id, args) {
	// Checks the type of the field
	var node = cache(id);
	if (node.type.match(reTypeInput) === null) {
		throw exception('NotEmpty', 'Constraint is not supported for the type {0}', node.type);
	}

	// Default
	var verify = {};
	args.index = args.index || 0;
	args.message = args.message || options('message').NotEmpty;

	// Check empty fields
	node.value = node.value.trim();
	if (node.value.length === 0 || node.selectedIndex === args.index) {
		verify.inspected = true;
		verify.message = message(args.label, args.message);
	}

	return response(verify);
};