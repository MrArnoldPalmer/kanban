var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var copy = require('gulp-copy');
var webserver = require('gulp-webserver');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

gulp.task('copy', function() {
  gulp.src('src/index.html')
    .pipe(copy('build', {
      prefix: 1
    }));
});

gulp.task('babel', function() {
  browserify('src/index.jsx', {extensions: ['.jsx'], debug: true})
    .transform(babelify)
    .bundle()
    .on('error', function(error) {
      console.log(error.message);
    })
    .pipe(source('index.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
  gulp.watch('src/index.html', ['copy']);
  gulp.watch(['src/**/*.jsx', 'src/**/*.js'], ['babel']);
});

gulp.task('server', function() {
  gulp.src('build')
    .pipe(webserver({
      livereload: true,
      fallback: 'index.html',
      open: true
    }));
});

gulp.task('build:test', function() {
  return browserify('src/test/index.js', {extensions: ['.jsx', 'js'], debug: true})
    .transform(babelify)
    .bundle()
    .on('error', function(error) {
      console.log(error.message);
    })
    .pipe(source('test.js'))
    .pipe(gulp.dest('src/test'));
});

gulp.task('test', ['build:test'], function () {
  gulp.src('src/test/runner.html')
  .pipe(mochaPhantomJS({
    reporter: 'spec'
  }));
});

gulp.task('default', ['copy', 'babel', 'watch', 'server']);
