module.exports = function (grunt) { 'use strict';

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),

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
				src : 'tmp/validate.js',
				dest : 'tmp/validate.js',
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
					banner : '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
							 '<%= grunt.template.today("yyyy-mm-dd") %> | created by <%= pkg.author %> */'
				},
				files : {
					'release/validate.js' : ['./tmp/validate.js']
				}
			}
		},

		uglify : {
			runtime : {
				options : {
					banner : '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
							 '<%= grunt.template.today("yyyy-mm-dd") %> | created by <%= pkg.author %> */\n'
				},
				files : {
					'release/validate.min.js' : ['release/validate.js']
				}
			}
		}
	});

	grunt.registerTask('default', [
		'copy',
		'jshint',
		'umd',
		'browserify',
		'uglify',
		'clean'
		]);
};