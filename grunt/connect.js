module.exports = {
     options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
    },
    livereload: {
        options: {
            open: true,
            base: [
                '.tmp',
                '<%= yeoman.app %>'
            ]
        }
    },
    test: {
        options: {
            base: [
                '.tmp',
                'test',
                '<%= yeoman.app %>'
            ]
        }
    },
    dist: {
        options: {
            open: true,
            base: '<%= yeoman.dist %>',
            livereload: false
        }
    }
}