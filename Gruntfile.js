module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            javascript: {
                files: ["Gruntfile.js", "package.json", "server.js", 'src/**/*.js', 'test/**/*.js'],
                tasks: "test"
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
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('test', ['jshint', 'simplemocha']);
    grunt.registerTask('default', ['watch']);

};