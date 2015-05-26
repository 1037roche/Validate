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
				src : ['src/*.js', 'Gruntfile.js', 'karma.conf.js'],
				options : {
					force : true,
					jshintrc : '.jshintrc',
					reporter : require('jshint-stylish')
				}
			}
		},

		karma : {
			runtime : {
				configFile : 'karma.conf.js'
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
					'validate.js' : ['./tmp/validate.js']
				}
			},
			debug : {
				options : {
					alias : [
						'./tmp/cache.js:cache',
						'./tmp/config.js:config',
						'./tmp/constraints.js:constraints',
						'./tmp/options.js:options',
						'./tmp/validate.js:validate'
					]
				},
				files : {
					'test/validate.debug.js' : [
						'cache',
						'config',
						'constraints.js',
						'options.js',
						'validate.js'
					]
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
					'validate.min.js' : ['validate.js']
				}
			}
		}
	});

	grunt.registerTask('default', [
		'copy',
		'jshint',
		'umd',
		'browserify:runtime',
		'uglify',
		'clean'
		]);

	grunt.registerTask('test', [
		'copy',
		'jshint',
		'umd',
		'browserify:debug',
		'clean',
		'karma'
		]);
};