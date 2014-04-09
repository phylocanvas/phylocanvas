module.exports = {
    dist: {
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: [
                '*.{ico,png,txt}',
                '.htaccess',
                'images/{,*/}*.{webp,gif}',
                'styles/fonts/{,*/}*.*'
            ]
        }]
    },
    styles: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
    },
    scripts: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>/scripts',
        dest: '.tmp/scripts/',
        src: '{,*/}*.js'
    }
}
