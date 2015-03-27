(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.validate = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
/* jshint -W097 */
'use strict';

// External modules
var cache = require('./cache');
var options = require('./options');

// Regular expresion
var	reMethod = /[a-zA-Z]*/;
var	reConstraint = /@[a-zA-Z]*\([^\)]*\)/g;
var	reArguments = /[\( ]+[A-Za-z]+='[^']*/g;

// The module to be exported
var config = module.exports = {};

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
		config.validate.push({
			id : id,
			verify : verify
		});
	}
};

// Elements to validate
config.validate = [];

config.checked = false;

// Initializes the validation
config.init = function (configuration) {
	if (!this.checked) {
		// Initial configuration
		this.checked = true;
		options.init(configuration);

		// Query selector
		var constraint = options('constraint');
		var selector = 'form[' + constraint + '],' +
						'input[' + constraint + '],' +
						'select[' + constraint + '],' +
						'textarea[' + constraint + ']';

		// Gets the items to validate
		var nodes = window.document.querySelectorAll(selector);
		[].forEach.call(nodes, function (node) {
			node.id = node.id || constraint + '-' + Math.floor(9999 * Math.random());
			cache(node.id, node);
			get(node.id, node.getAttribute(constraint));
		});
	}
};
},{"./cache":1,"./options":4}],3:[function(require,module,exports){
/* jshint -W097 */
'use strict';

// External modules
var cache = require('./cache');
var options = require('./options');

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
		throw 'Constraint is not supported \"' + id + '\"';
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
},{"./cache":1,"./options":4}],4:[function(require,module,exports){
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
},{"./cache":1}],5:[function(require,module,exports){
/*jshint sub:true*/
(function (root, factory) { 'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function () {
      return (factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['validate'] = factory();
  }
}(this, function () {

/* jshint -W097 */
'use strict';

// External modules
var config = require('./config');
var options = require('./options');
var constraints = require('./constraints');

//
return function (configuration) {
	config.init(configuration);
	return function () {
		config.validate.forEach(function (node) {
			node.verify.forEach(function (target) {
				var validate = constraints[target.constraint](node.id, target.arguments);
				if (validate.inspected) {
					options('callback').call({
						id : node.id,
						message : validate.message
					});
				}
			});
		});
	};
};
}));
},{"./config":2,"./constraints":3,"./options":4}]},{},[5])(5)
});