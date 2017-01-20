const autoprefixer = require('gulp-autoprefixer');
const batch = require('gulp-batch');
const config = require('./config');
const gulp = require('gulp');
const path = require('path');
const rimraf = require('rimraf');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');

const sourceDir = path.join(config.path.sourceDir, 'css');
const targetDir = path.join(config.path.staticDir, 'css');

gulp.task('clean:css', (cb) => {
  rimraf(targetDir, cb);
});

gulp.task('compile:css', ['clean:css'], () => {
  const autoprefixerOptions = {
    browsers: ['last 2 versions', '> 1%', 'Firefox ESR']
  };

  const sassOptions = {
    errLogToConsole: !config.IS_PROD,
    importer: (url, prev, done) => {
      if (url[0] === '~') url = path.resolve('node_modules', url.substr(1));
      else if (url[0] === '@') url = path.resolve('node_modules', url);
      return { file: url };
    },
    outputStyle: config.IS_PROD ? 'compressed' : 'expanded'
  };

  return gulp.src(path.join(sourceDir, 'main.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(targetDir));
});

gulp.task('watch:css', ['compile:css'], () => {
  watch(path.join(sourceDir, '**/*.scss'), batch((events, done) => {
    gulp.start('compile:css', done);
  }))
});
