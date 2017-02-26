const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

gulp.task('styles', function () {
    gulp.src('public/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('watchStyles', function () {
    gulp.watch('public/sass/**/*.scss', ['styles']);
});

gulp.task('scripts', () => {
    return gulp.src('public/js/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('public/js/dist'));
});
