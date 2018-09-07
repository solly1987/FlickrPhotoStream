/**
  gulp-clean.js
  ==========
  Removes all files in 'dest' folder
*/

var gulp      = require('gulp'),
    del       = require('del'),
    config    = require('../config');

//if the callback parameter is missing gulp-clean runs async, we don't want that
gulp.task('gulp-clean', function ( callback ) {
  return del( [config.dest + '/**'], callback );
});
