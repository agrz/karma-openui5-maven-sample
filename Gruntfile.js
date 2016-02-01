'use strict';

module.exports = function(grunt) {

	grunt.initConfig({

		dir: {
			webapp: 'src/main/javascript',
			dist: 'target/dist/webapp',
			bower_components: 'bower_components',
			dist_bower_components: 'target/dist/bower_components'
		},

		connect: {
			options: {
				port: 8080,
				hostname: '*'
			},
			src: {},
			dist: {}
		},

		openui5_connect: {
			options: {
				resources: [
					'<%= dir.dist_bower_components %>/openui5-sap.ui.core/resources',
					'<%= dir.dist_bower_components %>/openui5-sap.m/resources',
					'<%= dir.dist_bower_components %>/openui5-sap.ui.layout/resources',
					'<%= dir.dist_bower_components %>/openui5-themelib_sap_bluecrystal/resources'
				]
			},
			src: {
				options: {
					appresources: '<%= dir.webapp %>'
				}
			},
			dist: {
				options: {
					appresources: '<%= dir.dist %>'
				}
			}
		},

		openui5_preload: {
			component: {
				options: {
					resources: {
						cwd: '<%= dir.webapp %>',
						prefix: 'todo'
					},
					dest: '<%= dir.dist %>'
				},
				components: true
			}
		},

		clean: {
			dist: '<%= dir.dist %>/'
		},

		copy: {
			dist: {
				files: [ {
					expand: true,
					cwd: '<%= dir.webapp %>',
					src: [
						'**'
					],
					dest: '<%= dir.dist %>'
				} ]
			},
			notest: {
				files: [ {
					expand: true,
					cwd: '<%= dir.webapp %>',
					src: [
						'**',
						'!test/**'
					],
					dest: '<%= dir.dist %>'
				} ]
			},
			deps: {
				files: [ {
					expand: true,
					cwd: '<%= dir.bower_components %>',
					src: [
						'**'
					],
					dest: '<%= dir.dist_bower_components %>'
				} ]
			}
		},


		eslint: {
			webapp: ['<%= dir.webapp %>']
		}

	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-openui5');
	grunt.loadNpmTasks('grunt-eslint');

	// Server task
	grunt.registerTask('serve', function(target) {
		grunt.task.run('openui5_connect:' + (target || 'src') + ':keepalive');
	});

	// Linting task
	grunt.registerTask('lint', ['eslint']);

	// Build task
	grunt.registerTask('build', ['openui5_preload', 'copy:dist']);

	// Default task
    grunt.registerTask('default', ['build','serve:dist']);

	grunt.registerTask('all', [
		'lint',
		'clean',
		'build',
		'serve:dist'
	]);
};