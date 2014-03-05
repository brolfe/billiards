module.exports = function(grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-lintspaces');
    grunt.loadNpmTasks('grunt-http-server');


    grunt.initConfig({
        'http-server': {
            dev: {
                root: '.',

                port: 8282,
                host: '127.0.0.1',

                // cache: <sec>,
                showDir : true,
                autoIndex: true,
                defaultExt: 'html',

                //wait or not for the process to finish
                runInBackground: false
            }
        },
        lintspaces: {
            all: {
                src: [ 'src/**' , 'test/**', 'index.html' ],
                options: {
                    newline: true,
                    indentation: 'spaces',
                    spaces: 4
                }
            }
        },
        jshint: {
            // Use readJSON rather than the .jshintrc option so that the options
            // are available for reference in other tasks
            options: grunt.file.readJSON('.jshintrc'),
            sourceCode: {
                src: [ 'src/**/*.js' ]
            },
            tests: {
                src: [ 'test/**/*.js' ],
                // We read in additional jshint config to accommodate qunit globals
                options: grunt.file.readJSON('tools/qunit.jshintrc')
            },
            grunt: {
                src: [ 'Gruntfile.js' ],
                options: {
                    node: true,
                    // Relax the number of max statements for the Gruntfile.
                    maxstatements: 50
                }
            }
        },
        requirejs: {
            app: {
                options: {
                    baseUrl: '.',
                    include: ['src/main.js'],
                    stubModules: ['text'],
                    mainConfigFile: 'src/require_config.js',
                    exclude: ['bootstrap', 'jquery', 'underscore'],
                    out: 'dist/main.min.js',
                    wrap: {
                        startFile: 'tools/wrap.start'
                    },
                    logLevel: 2
                }
            }
        },
        csso: {
            app: {
                files: {
                    'dist/app.min.css': ['src/app.css']
                }
            }
        },
        copy: {
            'dist/index.html': 'index.html'
            // 'dist/.htaccess': '.htaccess'
        },
        usemin: {
            html: ['dist/index.html']
        },
        filerev: {
            options:{
                algorithm: 'sha1',
                length: 8
            },
            files: {
                src: [
                    'dist/main.min.js',
                    'dist/app.min.css'
                ]
            }
        },
        clean: [ 'dist' ],
        qunit: {
            all: [ 'test/qunit.html' ]
        }
    });

    grunt.registerTask('default', [
        // Check for stuff
        'clean',
        'lintspaces',
        'jshint',
        'qunit',

        // Generate stuff in the dist dir
        'requirejs',
        'copy',

        // Modify stuff in the dist dir
        'csso',
        'filerev',
        'usemin'
    ]);
};
