'use strict';
var fs      = require('fs'),
gulp        = require('gulp'),
browserSync = require('browser-sync').create();

require('gulp-task-loader-recursive')(gulp);

// Watch
gulp.task('watch', function () {
    // Static Server + watching scss/html files
    browserSync.init({
      server: {
        baseDir: './'
      }
    });
    gulp.watch('css/bundle.css').on('change', browserSync.reload)
    gulp.watch('scss/**/*.scss', ['build:css'])
});

gulp.task('default', [ 'watch', 'build:css' ]);
