/**
  copy-fonts.js
  ==========
  Copies fonts to the 'dest' folder
*/

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    config = require('../config').plugins;

gulp.task('copy-plugins', function () {
  gulp.src( config.src )
    //remove dirs, we only want files
    .pipe( rename({dirname: ''}))
    .pipe( gulp.dest( config.dest ));
});