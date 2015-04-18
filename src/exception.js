/* jshint -W097 */
'use strict';

//
module.exports = function (module) {
	return function () {
		// Arguments
		var code = arguments[0];
		var template = arguments[1];
		var templateArgs = arguments;

		// Build message
		var prefix = '[' + (module ? module + '-' : '') + code + '] ';
		var message = prefix + template.replace(/\{\d+\}/g, function (match) {
			var index = +match.slice(1, -1);
			return ((index + 2) < templateArgs.length) ? templateArgs[index + 2] : match;
		});
		return new Error(message);
	};
};