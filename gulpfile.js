'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', ['sass', 'sass:watch'], function () {});

gulp.task('sass', function () {
  gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/*.scss', ['sass']);
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:5000",
    files: ["public/uploader/*.*"],
    browser: "google chrome",
    port: 7000,
	});
});
