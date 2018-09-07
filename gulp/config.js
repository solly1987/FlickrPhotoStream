var src     = 'src',
    dest    = 'dist';

module.exports = {
  dest: dest,
  server: {
    src: 'dist',
  },
  browserify: {
    debug: true, //Enable source maps (non-minified files)
    extensions: ['.coffee', '.hbs'], // Additional file extentions to make optional

    // A separate bundle will be generated for each bundle config in this array
    bundleConfigs: [
      {
        entries:  './' + src + '/js/global.js', //wont work unless path starts with ./
        dest: './' + dest + '/js', //wont work unless path starts with ./
        outputName: 'global.js',
      }
    ],
    watchPath: [
      src + '/js/**/*.js',
      src + '/modules/**/*.js',
    ],
  },
  favicon: {
    dest: dest + '/',
    src: src + '/favicon.ico',
  },
  fonts: {
    dest: dest + '/fonts',
    src: src + '/fonts/**/*.{ttf,woff,eof,svg}',
    watchPath: src + '/fonts/**/*',
  },
  html: {
    dest: dest + '/',
    src: src + '/pages/**/*.html',
    watchPath: src + '/**/*.{html, inc}',
  },
  img: {
    dest: dest + '/images',
    src: src + '/images/**/*',
    watchPath: src + '/images/**/*',
  },
  pdf: {
    dest: dest + '/pdf',
    src: src + '/pdf/**/*',
    watchPath: src + '/pdf/**/*',
  },
  plugins: {
    dest: dest + '/js/plugins',
    src: src + '/js/plugins/**/*',
    watchPath: src + '/js/plugins/**/*',
  },
  sass: {
    dest: dest + '/css',
    src:  src + '/scss/*.scss',
    watchPath: [
      src + '/scss/**/*.scss',
      src + '/modules/**/*.scss',
    ]
  },
};