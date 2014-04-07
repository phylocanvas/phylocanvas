module.exports = {
    server: [
        'copy:styles'
    ],
    test: [
        'copy:styles',
        'copy:scripts',
    ],
    dist: [
        'copy:styles'
    ]
}