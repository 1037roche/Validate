module.exports = function (grunt) { 'use strict';

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		jshint : {
			runtime : {
				src : ['src/*.js', 'Gruntfile.js'],
				options : {
					jshintrc : '.jshintrc',
					reporter : require('jshint-stylish')
				}
			}
		}
	});
};