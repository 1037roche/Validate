'use strict';

// External modules
var cache = require('./cache');

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
		message  : verify.message || null,
		inspected : (verify.inspected in verify) ? verify.inspected : false
	};
};

// The module to be exported
var constraint = module.exports = {};

// Verifies that no fields are empty
constraint.NotEmpty = function (id, args) {
	// Checks the type of the field
	var node = cache(id);
	if (node.type.match(reTypeInput) === null) {
		throw 'Constraint is not supported \"' + id + '\"';
	}

	// Default
	var verify = {};
	args.index = args.index || 0;
	args.message = args.message || ''; // Pendiente

	// Check empty fields
	node.value = node.value.trim();
	if (node.value.length === 0 || node.selectedIndex === args.index) {
		verify.inspected = true;
		verify.message = message(args.label, args.message);
	}
	return response(verify);
};