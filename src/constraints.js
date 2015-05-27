/* jshint -W097 */
'use strict';

// External modules
var cache = require('./cache');
var options = require('./options');
var exception = require('./exception')('constraint');

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
// @NotEmpty([label='label:string'], [message='message:string'], [index='index:int'])
constraint.NotEmpty = function (id, args) {
	var node = cache(id);
	if (node === null) {
		throw exception('NotEmpty', "The node " + id + " is not defined");
	}

	var verify = {};
	args.index = args.index || 0;
	args.message = args.message || options('message').NotEmpty;

	node.value = node.value.trim();
	if (node.value.length === 0 || node.selectedIndex === args.index) {
		verify.inspected = true;
		verify.message = message(args.label, args.message);
	}

	return response(verify);
};

// Check if the value is an email
// @Email([label='label:string'], [message='message:string'])
constraint.Email = function (id, args) {
	var node = cache(id);
	if (node === null) {
		throw exception('Email', "The node " + id + " is not defined");
	}

	var verify = {};
	args.message = args.message || options('message').Email;

	if (node.value.match() === null) {
		verify.inspected = true;
		verify.message = message(args.label, args.message);
	}

	return response(verify);
};