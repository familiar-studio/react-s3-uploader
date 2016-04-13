'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

gulp.task('default', ['sass', 'sass:watch'], function () {});

gulp.task('sass', function () {
  gulp.src('./public/uploader/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/uploader'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./public/uploader/*.scss', ['sass']);
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:5000",
    files: ["public/uploader/*.*"],
    browser: "google chrome",
    port: 7000,
	});
});
