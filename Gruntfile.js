module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    // grunt.loadNpmTasks('grunt-contrib-jshint');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*! <%= pkg.name %> - <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            base: {
                options: {
                    mangle: false,
                    beautify: true
                },
                src: [
                    'src/js/angular.min.js'
                ],
                dest: 'tmp/js/base.js'
            },
            app: {
                options: {
                    mangle: false,
                    beautify: true
                },
                src: [
                    'src/js/app.js',
                    'src/js/modules/**/*.js'
                ],
                dest: 'tmp/js/app.js'
            },
            vendor: {
                options: {
                    mangle: false,
                    beautify: true
                },
                src: [
                    'src/js/vendor/angular/**/*.min.js'
                ],
                dest: 'tmp/js/vendor.js'
            },
            all: {
                options: {
                    mangle: false,
                    beautify: true
                },
                src: [
                    'tmp/js/base.js',
                    'tmp/js/app.js',
                    'tmp/js/vendor.js'
                ],
                dest: 'build/js/all.js'
            }
        },
        compass: {
            options: {
                config: 'config/compass.rb'
            },
            dev: {
                options: {
                    environment: 'development',
                    outputStyle: 'expanded',
                    relativeAssets: true
                }
            }
        },
        cssmin: {
            dev: {
                expand: true,
                files: {
                    "build/css/all.css": [
                    "tmp/compass.css",
                    "src/css/**/*.css"
                    // "vendor/assets/components/font-awesome/css/font-awesome.min.css",
                    // "vendor/assets/components/pines-notify/jquery.pnotify.default.css",
                    // "vendor/assets/components/pines-notify/jquery.pnotify.default.icons.css",
                    // "vendor/assets/js/jquery-ui/css/default/jquery-ui-1.10.3.custom.min.css"
                    ]
                }
            }
        },
        copy: {
            index: {
                files:[{
                    src: ['src/index.html'],
                    dest: 'build/index.html'
                }, {
                    expand: true,
                    cwd: 'src/',
                    src: ['img/**'],
                    dest: 'build/'
                }, {
                    expand: true,
                    cwd: 'src/',
                    src: ['views/**'],
                    dest: 'build/'
                }]
            }
        },
        clean: {
            build: ['build'],
            tmp: ['tmp', '.sass-cache']
        },
        watch: {
            options: {
                livereload: true,
            },
            app: {
                files: ['src/js/app.js', 'src/modules/**/*.js'],
                tasks: ['uglify:app']
            },
            compass: {
                files: ['src/scss/**/*.scss'],
                tasks: ['compass']
            },
            another: {
                files: ['src/index.html', 'src/img/**/*.*', 'app/views/**/*.*'],
                tasks: ['copy']
            }
        }

    });

    grunt.registerTask('default', ['clean:build', 'uglify', 'compass', 'cssmin', 'copy', 'clean:tmp', 'watch']);

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
};
