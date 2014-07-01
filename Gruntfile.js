module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        express: {
            options: {
                // Override defaults here
                delay: 100,
            },
            dev: {
                options: {
                    script: 'server.js'
                }
            },
            web: {
                options: {
                    script: 'server.js'
                }
            }
        }, watch: {
            app: {
                files: ["Gruntfile.js", "package.json", "server.js", 'src/**/*.js', 'test/**/*.js'],
                tasks: ["express:web"],
                options: {
                    spawn: false, atBegin: true
                }
            },
            test: {
                files: ["Gruntfile.js", "package.json", "server.js", 'src/**/*.js', 'test/**/*.js'],
                tasks: ["test"],
                options: {
                    atBegin: true
                }
            }
        }, jshint: {
            files: ['Gruntfile.js', 'server.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: false,
                    console: true,
                    module: true,
                    document: true
                }
            }
        }, simplemocha: {
            options: {
                globals: ['expect'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            },
            all: { src: ['test/**/*.js'] }
        },
        parallel: {
            runAndTest: {
                options: {
                    stream: true
                },
                tasks: [
                    {
                        grunt: true,
                        args: ['watch:app']
                    },
                    {
                        grunt: true,
                        args: ['watch:test']
                    }
                ]
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('test', ['jshint', 'simplemocha']);
    grunt.registerTask('default', ['parallel:runAndTest']);

};