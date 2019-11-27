const gulp = require('gulp');

gulp.task('processHTML', (process) => {
    gulp.src('*.html')
    .pipe(gulp.dest('dist'));
    process();
})

gulp.task('processJS', (process) => {
    gulp.src('*.js')
    .pipe(gulp.dest('dist'));
    process();
})

