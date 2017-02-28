"use strict";

const gulp = require('gulp');

const image = require('gulp-image');

const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');

const browserify = require('gulp-browserify');
const babelify = require('babelify');
const vueify = require('vueify');
const uglifyify = require('uglifyify');

gulp.task('image', function () {
    gulp.src('src/img/*')
        .pipe(image())
        .pipe(gulp.dest('./public/img'));
});

gulp.task('styles', () => {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css'));
});

gulp.task('app', () => {
    process.env.NODE_ENV = 'production';
    return gulp.src('src/js/app.js')
        .pipe(browserify({
            transform: [
                babelify,
                [{_flags: {debug: true}}, vueify],
                uglifyify
            ],
        }))
        .pipe(gulp.dest('public/js'));
});

gulp.task('build', ["styles", "app"]);