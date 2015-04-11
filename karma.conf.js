module.exports = function (config) { 'use strict';
	config.set({

		frameworks : [
			'jasmine'
		],

		// list of files / patterns to load in the browser
		files : [
			'test/**/*.js',
			'test/**/*.html',
		],

    	// list of files to exclude
		exclude : [],

		preprocessors : {
			'test/**/*.js' : ['coverage'],
			'test/**/*.html': ['html2js']
		},

		// use dots reporter, as travis terminal does not support escaping sequences
		// possible values: 'dots', 'progress'
		reporters : ['progress', 'coverage'],

    	// web server port
		port : 9876,

		// enable / disable colors in the output (reporters and logs)
		colors : true,

		// level of logging
		// possible values:
		// config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel : config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch : true,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers : ['PhantomJS'],

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout : 20000,

		// Auto run tests on start (when browsers are captured) and exit
		singleRun : false,

		// report which specs are slower than 500ms
		reportSlowerThan : 500,

	 	plugins : [
	 		'karma-jasmine',
	 		'karma-coverage',
	 		'karma-phantomjs-launcher',
	 		'karma-html2js-preprocessor'
 		]
	});
};