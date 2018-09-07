/**
  copy-images.js
  ==========
  Copies images to the 'dest' folder
*/

var gulp      = require('gulp'),
    config    = require('../config').img,
    imagemin  = require('gulp-imagemin');

gulp.task('copy-images', function () {
  gulp.src( config.src )
    //Run imagemin
    //.pipe(imagemin())
    .pipe( gulp.dest( config.dest ));
});