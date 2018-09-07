/**
  dafault.js
  ==========
  Contains default gulp tasks.
*/
var gulp          = require('gulp'),
    runSequence   = require('run-sequence').use(gulp);

gulp.task('default', ['lint'], function() {
  runSequence(
    'gulp-clean',
    [
      'copy-favicon',
      'copy-fonts',
      'copy-html',
      'copy-images',
      'copy-pdf',
      'copy-plugins',
      'sass',
      'browserify',
    ],
    'server-livereload',
    'watch'
  );
});

gulp.task('clean', ['gulp-clean']);