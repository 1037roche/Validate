/* jshint -W097 */
'use strict';

// External modules
var config = require('./config');
var options = require('./options');
var constraints = require('./constraints');

// Initializes validation
return function (configuration) {
	config.init(configuration);

	// Execute validation
	return function (form) {
		// validar form formulario en array de formularios
		// si esta en el array de formularios vuelve a inicializar
		// config.checked = false;
		// config.init();
		//
		//


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