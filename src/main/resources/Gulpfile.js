"use strict";

const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const browserify = require('gulp-browserify');
const vueify = require('vueify');

gulp.task('styles', () => {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css'));
});

gulp.task('watchStyles', () => {
    gulp.watch('src/sass/**/*.scss', ['styles']);
});

gulp.task('scripts', () => {
    return gulp.src('src/js/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task("vue", () => {
    return gulp.src('src/js/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(browserify({
            transform: [[{_flags: {debug: true}}, vueify]]
        }))
        .pipe(gulp.dest('public/js'));
});

gulp.task('build', ["styles", "vue"]);