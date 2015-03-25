/* jshint -W097 */
'use strict';

// External modules
var config = require('./config');

//
module.exports = function (configuration) {
	config.init(configuration);
	return function () { console.log('execute'); };
};