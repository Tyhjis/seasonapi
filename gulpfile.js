'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCss = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');

var b = browserify({
  entries: './public/js/app.jsx',
  debug: true
});

gulp.task('sass', compileSass);
gulp.task('js', buildJS);
gulp.task('watch', watch);
gulp.task('default', watch);

function compileSass() {
  return gulp.src('./public/css/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/css'));
}

function buildJS() {
  if(process.env === 'production') {
    return compileProductionJS();
  } else {
    return compileJS();
  }
}

function compileJS() {
  return b.transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./public/js'));
}

function compileProductionJS() {
  return b.transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
}

function watch() {
  gulp.watch('./public/css/**/*.scss', ['sass']);
  gulp.watch('./public/js/**/*.jsx', ['js']);
}
