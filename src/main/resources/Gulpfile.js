"use strict";

const gulp = require('gulp');

const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');

const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const vueify = require('vueify');
const uglify = require('gulp-uglify');

gulp.task('styles', () => {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css'));
});

gulp.task("app", () => {
    return gulp.src('src/js/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(browserify({
            transform: [[{_flags: {debug: true}}, vueify]]
        }))
        .pipe(gulp.dest('public/js'));
});

gulp.task('build', ["styles", "app"]);