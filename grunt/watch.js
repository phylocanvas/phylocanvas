module.exports = {
    styles: {
        files: ['<%= yeoman.app %>/less/{,*/}*.less'],
        tasks: ['less', 'copy:styles', 'autoprefixer']
    },
    livereload: {
        options: {
            livereload: '<%= connect.options.livereload %>'
        },
        files: [
            '<%= yeoman.app %>/*.html',
            '.tmp/styles/{,*/}*.css',
            '{.tmp,<%= yeoman.app %>}/{,*/}*.js',
            '<%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
        ]
    }
}