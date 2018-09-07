/**
  copy-favicon.js
  ==========
  Copies favicon to the 'dest' folder
*/

var gulp = require('gulp'),
    config = require('../config').favicon;

gulp.task('copy-favicon', function () {
  gulp.src( config.src )
    .pipe( gulp.dest( config.dest ));
});