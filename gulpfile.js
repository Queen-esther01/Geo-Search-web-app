const gulp = require('gulp');
const eslint = require('eslint');

gulp.task('processHTML', (process) => {
    gulp.src('*.html')
    .pipe(gulp.dest('dist'));
    process();
})

gulp.task('processJS', (process) => {
    gulp.src('*.js')
    .pipe(eslint({
        esversion: 6
    }))
    .pipe(eslint.reporter('default'))
    .pipe(gulp.dest('dist'));
    process();
})

gulp.task('processIMAGES', (process) => {
    gulp.src('*.jpg', '*.png')
    .pipe(gulp.dest('dist'));
    process();
})