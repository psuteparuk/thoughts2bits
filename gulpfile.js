const gulp = require('gulp');
const requireDir = require('require-dir');

requireDir('./gulp_tasks');

gulp.task('default', ['watch:css']);
