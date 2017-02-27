"use strict";

const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');


gulp.task('styles', () => {
    gulp.src('public/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('watchStyles', () => {
    gulp.watch('public/sass/**/*.scss', ['styles']);
});

gulp.task('scripts', () => {
    return gulp.src('public/js/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('public/js/dist'));
});

gulp.task('build', ["styles", "scripts"]);