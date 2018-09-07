/**
  copy-fonts.js
  ==========
  Copies fonts to the 'dest' folder
*/

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    config = require('../config').fonts;

gulp.task('copy-fonts', function () {
  gulp.src( config.src )
    //remove dirs, we only want files
    .pipe( rename({dirname: ''}))
    .pipe( gulp.dest( config.dest ));
});