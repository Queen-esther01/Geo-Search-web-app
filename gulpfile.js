const gulp = require('gulp');
const eslint = require('eslint');
const babel = require('gulp-babel');

gulp.task('processHTML', (process) => {
    gulp.src('*.html')
    .pipe(gulp.dest('dist'));
    process();
})

gulp.task('processCSS', (process) => {
    gulp.src('css/*.css')
    .pipe(gulp.dest('dist'));
    process();
})

gulp.task('processJS', (process) => {
    gulp.src('js/*.js')
    .pipe(eslint({
        esversion: 6
    }))
    .pipe(eslint.reporter('default'))
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest('dist'));
    process();
})

gulp.task('processIMAGES', (process) => {
    gulp.src('*.jpg', '*.png')
    .pipe(gulp.dest('dist'));
    process();
})