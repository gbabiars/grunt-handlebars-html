/*
 * grunt-handlebars-html
 * 
 *
 * Copyright (c) 2014 Greg Babiars
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    // load all npm grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        handlebars_html: {
            relative_paths: {
                options: {
                    paths: {
                        js: [
                            'test/scripts/*.js'
                        ]
                    }
                },
                files: {
                    'tmp/relative_paths.html': 'test/fixtures/relative_paths.hbs'
                }
            },

            relative_paths_with_process: {
                options: {
                    paths: {
                        js: [
                            'test/scripts/*.js'
                        ]
                    },
                    process: function(path) {
                        return path.replace('test/scripts/', '');
                    }
                },
                files: {
                    'tmp/relative_paths_with_process.html': 'test/fixtures/relative_paths.hbs'
                }
            },

            custom_data: {
                options: {
                    data: {
                        jsFiles: [
                            'some_file.js',
                            'another_file.js'
                        ],
                        debug: true
                    }
                },
                files: {
                    'tmp/custom_data.html': 'test/fixtures/custom_data.hbs'
                }
            },

            relative_paths_and_custom_data: {
                options: {
                    paths: {
                        js: [
                            'test/scripts/*.js'
                        ]
                    },
                    process: function(path) {
                        return path.replace('test/scripts/', '');
                    },
                    data: {
                        jsFiles: [
                            'some_file.js',
                            'another_file.js'
                        ],
                        debug: true
                    }
                },
                files: {
                    'tmp/relative_paths_and_custom_data.html': 'test/fixtures/relative_paths_and_custom_data.hbs'
                }
            }
//      custom_options: {
//        options: {
//          separator: ': ',
//          punctuation: ' !!!'
//        },
//        files: {
//          'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123']
//        }
//      }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'handlebars_html', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
