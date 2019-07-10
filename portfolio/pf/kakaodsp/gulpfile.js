'use strict';

var gulp = require('gulp');
var fileinclude = require('gulp-file-include');


gulp.task('fileinclude', function() {
    return gulp.src('./src/*/*.html')
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', function () {
   return gulp.watch(['./src/*/*.html','./css/*.css'], gulp.series('fileinclude'));
});
 
