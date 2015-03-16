'use strict';

var cache = require('./cache');

var core = {
	constraint : 'data-validate',

	options : function (options) {

	}
};

module.exports = function (options) {
	core.options(options);
	var selector = 'form[' + core.constraint + '],input[' + core.constraint + '],' +
				   'select[' + core.constraint + '],textarea[' + core.constraint + ']';

   	var nodes = window.document.querySelectorAll(selector);
   	[].forEach.call(nodes, function (node) {
   		node.id = node.id || core.constraint + '-' + Math.floor(9999 * Math.random());
   		cache(node.id, node);
   	});
};