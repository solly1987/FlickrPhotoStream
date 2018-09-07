/**
  copy-pdf.js
  ==========
  Copies pdfs to the 'dest' folder
*/

var gulp = require('gulp'),
    config = require('../config').pdf;

gulp.task('copy-pdf', function () {
  gulp.src( config.src )
    .pipe( gulp.dest( config.dest ));
});