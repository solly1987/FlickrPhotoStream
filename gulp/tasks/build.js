/**
  build.js
  ==========
  Runs the build task.
*/
var gulp          = require('gulp'),
    runSequence   = require('run-sequence').use(gulp);

gulp.task('build', ['lint'], function() {
  runSequence(
    'gulp-clean',
    [
      'copy-favicon',
      'copy-fonts',
      'copy-html',
      'copy-images',
      'copy-pdf',
      'copy-plugins',
      'sass-deploy',
      'browserify'
    ]
  );
});