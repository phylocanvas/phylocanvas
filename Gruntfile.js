// Generated on 2013-12-05 using generator-webapp 0.4.4
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-config')(grunt);

//    grunt.initConfig({
//        // configurable paths
//        yeoman: ,
//        less: {
//            development: {
//                options: {
//                    compress: true,
//                    yuicompress: true,
//                    optimization: 2
//                },
//                files: {
//                    // target.css file: source.less file
//                    '<%= yeoman.app %>/PhyloCanvas.css': '<%= yeoman.app %>/PhyloCanvas.less'
//                }
//            }
//        },
//        watch: {
//            
//        },
//        connect: {
//           
//        },
//        clean: {
//            
//        },
//        jshint: {
//            options: {
//                jshintrc: '.jshintrc',
//                reporter: require('jshint-stylish')
//            },
//            all: [
//                'Gruntfile.js',
//                '<%= yeoman.app %>/{,*/}*.js',
//                '!<%= yeoman.app %>/vendor/*',
//                'test/spec/{,*/}*.js'
//            ]
//        },
//        mocha: {
//            all: {
//                options: {
//                    run: true,
//                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
//                }
//            }
//        },
//        autoprefixer: {
//            
//        },
//        // not used since Uglify task does concat,
//        // but still available if needed
//        /*concat: {
//            dist: {}
//        },*/
//        // not enabled since usemin task does concat and uglify
//        // check index.html to edit your build targets
//        // enable this task if you prefer defining your build targets here
//        /*uglify: {
//            dist: {}
//        },*/
//        'bower-install': {
//            app: {
//                html: '<%= yeoman.app %>/index.html',
//                ignorePath: '<%= yeoman.app %>/'
//            }
//        },
//        rev: {
//            dist: {
//                files: {
//                    src: [
//                        '<%= yeoman.dist %>/{,*/}*.js',
//                        '<%= yeoman.dist %>/{,*/}*.css',
//                        '<%= yeoman.dist %>/images/{,*/}*.{gif,jpeg,jpg,png,webp}',
//                        '<%= yeoman.dist %>/styles/fonts/{,*/}*.*'
//                    ]
//                }
//            }
//        },
//        useminPrepare: {
//            options: {
//                dest: '<%= yeoman.dist %>'
//            },
//            html: '<%= yeoman.app %>/index.html'
//        },
//        usemin: {
//            options: {
//                assetsDirs: ['<%= yeoman.dist %>']
//            },
//            html: ['<%= yeoman.dist %>/{,*/}*.html'],
//            css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
//        },
//        imagemin: {
//            dist: {
//                files: [{
//                    expand: true,
//                    cwd: '<%= yeoman.app %>/images',
//                    src: '{,*/}*.{gif,jpeg,jpg,png}',
//                    dest: '<%= yeoman.dist %>/images'
//                }]
//            }
//        },
//        svgmin: {
//            dist: {
//                files: [{
//                    expand: true,
//                    cwd: '<%= yeoman.app %>/images',
//                    src: '{,*/}*.svg',
//                    dest: '<%= yeoman.dist %>/images'
//                }]
//            }
//        },
//        cssmin: {
//            // This task is pre-configured if you do not wish to use Usemin
//            // blocks for your CSS. By default, the Usemin block from your
//            // `index.html` will take care of minification, e.g.
//            //
//            //     <!-- build:css({.tmp,app}) styles/main.css -->
//            //
//            // dist: {
//            //     files: {
//            //         '<%= yeoman.dist %>/styles/main.css': [
//            //             '.tmp/styles/{,*/}*.css',
//            //             '<%= yeoman.app %>/styles/{,*/}*.css'
//            //         ]
//            //     }
//            // }
//        },
//        htmlmin: {
//            dist: {
//                options: {
//                    /*removeCommentsFromCDATA: true,
//                    // https://github.com/yeoman/grunt-usemin/issues/44
//                    //collapseWhitespace: true,
//                    collapseBooleanAttributes: true,
//                    removeAttributeQuotes: true,
//                    removeRedundantAttributes: true,
//                    useShortDoctype: true,
//                    removeEmptyAttributes: true,
//                    removeOptionalTags: true*/
//                },
//                files: [{
//                    expand: true,
//                    cwd: '<%= yeoman.app %>',
//                    src: '*.html',
//                    dest: '<%= yeoman.dist %>'
//                }]
//            }
//        },
//        // Put files not handled in other tasks here
//        copy: {
//            
//        },
//        modernizr: {
//            devFile: '<%= yeoman.app %>/bower_components/modernizr/modernizr.js',
//            outputFile: '<%= yeoman.dist %>/bower_components/modernizr/modernizr.js',
//            files: [
//                '<%= yeoman.dist %>/{,*/}*.js',
//                '<%= yeoman.dist %>/{,*/}*.css',
//                '!<%= yeoman.dist %>/scripts/vendor/*'
//            ],
//            uglify: true
//        },
//        concurrent: {
//            
//        }
//    });
//
//    grunt.loadNpmTasks('grunt-contrib-less');
//    grunt.loadNpmTasks('grunt-contrib-watch');
//    
//    grunt.registerTask('serve', function (target) {
//        if (target === 'dist') {
//            return grunt.task.run(['build', 'connect:dist:keepalive']);
//        }
//
//        grunt.task.run([
//            
//        ]);
//    });
//
//    grunt.registerTask('test', [
//        'clean:server',
//        'concurrent:test',
//        'autoprefixer',
//        'connect:test',
//        'mocha'
//    ]);
//
//    grunt.registerTask('build', [
//        'clean:dist',
//        'useminPrepare',
//        'concurrent:dist',
//        'autoprefixer',
//        'concat',
//        'cssmin',
//        'uglify',
//        'modernizr',
//        'copy:dist',
//        'rev',
//        'usemin'
//    ]);
//
//    grunt.registerTask('default', [
//        'jshint',
//        'test',
//        'build'
//    ]);
};
