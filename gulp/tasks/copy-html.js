/**
  copy-html.js
  ==========
  Copies html to the 'dest' folder
*/

var gulp = require('gulp'),
    config = require('../config').html,
    fileinclude = require('gulp-file-include');

gulp.task('copy-html', function () {
  gulp.src( config.src )

    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))

    .pipe( gulp.dest( config.dest ));
});