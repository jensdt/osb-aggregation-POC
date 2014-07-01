module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        express: {
            options: {
                // Override defaults here
                delay: 10
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
        }, wait: { // wait is used to make sure express app is up and running before open
            options: {
                delay: 2000
            },
            pause: {
                options: {
                    before : function(options) {
                        console.log('pausing %dms', options.delay);
                    },
                    after : function() {
                        console.log('pause end');
                    }
                }
            }
        }, open: {
            server: {
                path: 'http://localhost:3000'
            }
        },
        parallel: {
            dev: {
                options: {
                    stream: true,
                    grunt: true
                },
                tasks: ['watch:app', 'watch:test', "doshow"]
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('doshow', ['wait:pause', 'open:server']);
    grunt.registerTask('test', ['jshint', 'simplemocha']);
    grunt.registerTask('default', ['parallel:dev']);

};