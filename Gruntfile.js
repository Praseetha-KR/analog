'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		express: {
			dev: {
				options: {
					script: 'server.js',
					debug: 'true'
				}
			}
		},
		watch: {
			express: {
				files: ['**/*.js', '!**/node_modules/**'],
				tasks: ['express:dev'],
				options: {
					spawn: false
				}
			},
			compass: {
				files: ['app/**/*.{scss,sass}'],
				tasks: ['compass:dev']
			},
			js: {
				files: ['app/assets/js/**/*.js'],
				tasks: ['uglify']
			}
		},
		compass: {
			dev: {
				options: {
					sassDir: ['app/assets/styles/sass'],
					cssDir: ['app/assets/styles/css'],
					environment: 'development'
				}
			},
			prod: {
				options: {
					sassDir: ['app/assets/styles/sass'],
					cssDir: ['app/assets/styles/css'],
					environment: 'production'
				}
			},
		},
		uglify: {
			all: {
				files: {
					'app/assets/js/min/app.min.js': [
						'app/assets/js/libs/jquery.js',
						'app/assets/js/app.js'
					]
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['compass:dev', 'uglify', 'watch']);
	grunt.registerTask('production', ['compass:prod', 'uglify:all', 'watch'])
};
