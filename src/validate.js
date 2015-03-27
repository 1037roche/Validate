/* jshint -W097 */
'use strict';

// External modules
var config = require('./config');
var options = require('./options');
var constraints = require('./constraints');

//
return function (configuration) {
	config.init(configuration);

	//
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