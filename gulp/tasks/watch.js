/**
  watch.js
  ==========
  Tracks jade, js, css, and image changes in /static and rebuilds on change
*/

var gulp = require('gulp'),
    config = require('../config');

/** !!! Currently does not accommodate for new or deleted files !!! */
gulp.task('watch', function() {
  gulp.watch( config.browserify.watchPath , ['lint', 'browserify']);
  gulp.watch( config.fonts.watchPath , ['copy-fonts']);
  gulp.watch( config.html.watchPath , ['copy-html']);
  gulp.watch( config.img.watchPath , ['copy-images']);
  gulp.watch( config.plugins.watchPath , ['copy-plugins']);
  gulp.watch( config.sass.watchPath , ['sass']);
});
