module.exports = function (grunt) { 'use strict';

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		clean : {
			runtime : {
				src : ['tmp']
			}
		},

		copy : {
			runtime : {
				expand : true,
				cwd : 'src',
				src : ['**'],
				dest : 'tmp/'
			}
		},

		jshint : {
			runtime : {
				src : ['src/*.js', 'Gruntfile.js'],
				options : {
					force : true,
					jshintrc : '.jshintrc',
					reporter : require('jshint-stylish')
				}
			}
		},

		umd : {
			runtime : {
				src : 'tmp/release/validate.js',
				dest : 'release/validate.js',
				template : 'umd/umd.hbs',
				globalAlias : 'validate',
			}
		},

		browserify : {
			runtime : {
				options : {
					browserifyOptions: {
						debug : false,
						standalone : 'validate'
					},
					alias : [

					]
				},
				files : {
					'release/validate.js' : ['./tmp/validate.js']
				}
			}
		},

		uglify : {
			runtime : {
				files : {
					'release/validate.min.js' : ['release/validate.js']
				}
			}
		}
	});

	grunt.registerTask('default', [
		'copy',
		'jshint',
		'browserify',
		'uglify',
		'clean'
		]);
};