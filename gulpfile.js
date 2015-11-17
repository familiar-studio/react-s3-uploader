'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

gulp.task('default', ['sass', 'browser-sync', 'sass:watch'], function () {});

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

gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({ script: 'server.js'})
		.on('start', function () {
			if (!started) { cb(); started = true; }
		})
	  .on('restart', function onRestart() {
	    // reload connected browsers after a slight delay
	    setTimeout(function reload() {
	      browserSync.reload({
	        stream: false
	      });
	    }, 500);
		});
});
