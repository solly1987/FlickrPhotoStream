/**
  sass.js
  ======================
  Combines separate .scss files into on .css file.  Creates a monified copy of that file.
*/

var gulp          = require('gulp'),
    config        = require('../config').sass,
    sass          = require('gulp-sass'),
    plumber       = require('gulp-plumber'),
    postcss       = require('gulp-postcss'),
    gulpif        = require('gulp-if'),
    autoprefixer  = require('autoprefixer'),
    cssnano       = require('cssnano'),
    rename        = require('gulp-rename'),
    sourcemaps    = require('gulp-sourcemaps');

gulp.task( 'sass', function (){
  var processors = [
    autoprefixer({browsers: ['last 1 version']}),
    cssnano(),
  ];
  gulp.src( config.src )
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err);
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: false,
      onError: function(err) {
        console.log('[gulp-sass] ' + err.message + ' on line ' + err.line + ' in ' + err.file);
      }
    }))
    .pipe( gulp.dest( config.dest ))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe( rename({ suffix: '.min'}) )
    .pipe( gulp.dest( config.dest ))
});

gulp.task( 'sass-deploy', function (){
  var processors = [
    autoprefixer({browsers: ['last 1 version']}),
    cssnano(),
  ];
  gulp.src( config.src )
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err);
      }
    }))
    /*.pipe(sourcemaps.init())*/
    .pipe(sass({
      errLogToConsole: false,
      onError: function(err) {
        console.log('[gulp-sass] ' + err.message + ' on line ' + err.line + ' in ' + err.file);
      }
    }))
    .pipe( gulp.dest( config.dest ))
    .pipe(postcss(processors))
    /*.pipe(sourcemaps.write())*/
    .pipe( rename({ suffix: '.min'}) )
    .pipe( gulp.dest( config.dest ))
});