/**
  browserify.js
  ======================
  Creates JS bundles.
*/

var gulp         = require('gulp'),
    browserify   = require('browserify'),
    bundleLogger = require('../util/bundleLogger'),
    config       = require('../config').browserify,
    handleErrors = require('../util/handleErrors'),
    rename       = require('gulp-rename'),
    source       = require('vinyl-source-stream'),
    streamify    = require('gulp-streamify'),
    uglify       = require('gulp-uglify'),
    watchify     = require('watchify');

gulp.task('browserify', function (callback) {
  var bundleQueue = config.bundleConfigs.length;

  var browserifyThis = function (bundleConfig) {

    var bundler = browserify({
      cache: {}, // Required watchify args (first 3, or ???)
      packageCache: {},
      fullPaths: true,
      entries: bundleConfig.entries, // Specify the entry point of your app
      extensions: config.extensions, // Add file extentions to make optional in your requires
      debug: config.debug, // !!! Enable source maps (non-minified files) !!!
    });

    var bundle = function () {
      bundleLogger.start(bundleConfig.outputName); // Log when bundling starts
        return bundler
          .transform('babelify', {presets: ['es2015']})
          .bundle()
          .on('error', handleErrors) // Report compile errors
          .pipe(source(bundleConfig.outputName)) // Use vinyl-source-stream to make the stream gulp compatible. Specifiy the desired output filename here.
          .pipe(gulp.dest(bundleConfig.dest)) // Specify the output destination
          .pipe(streamify(uglify()))
          .pipe(rename({ suffix: '.min' }))
          .pipe(gulp.dest(bundleConfig.dest)) // Specify the output destination
          .on('end', reportFinished);
    };

    if (global.isWatching) {

      // Wrap with watchify and rebundle on changes
      bundler = watchify(bundler);

      // Rebundle on update
      bundler.on('update', bundle);
    }

    var reportFinished = function () {
      // Log when bundling completes
      bundleLogger.end(bundleConfig.outputName);

      if (bundleQueue) {
        bundleQueue--;
        if (bundleQueue === 0) {
          // If queue is empty, tell gulp the task is complete.
          // https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
          callback();
        }
      }
    };

    return bundle();
  };

  // Start bundling with Browserify for each bundleConfig specified
  config.bundleConfigs.forEach(browserifyThis);

});
