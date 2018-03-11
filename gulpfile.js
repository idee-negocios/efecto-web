var autoprefixer       = require('gulp-autoprefixer');
var beeper             = require('beeper');
var browserSync        = require('browser-sync');
var cache              = require('gulp-cache');
var cleanCSS           = require('gulp-clean-css');
var gconcat            = require('gulp-concat');
var gulp               = require('gulp');
var gutil              = require('gulp-util');
var imagemin           = require('gulp-imagemin');
var notify             = require('gulp-notify');
var plumber            = require('gulp-plumber');
var pug                = require('gulp-pug');
var rename             = require("gulp-rename");
var sass               = require('gulp-sass');
var sourcemaps         = require('gulp-sourcemaps');
var uglify             = require('gulp-uglify');

var webpack =  require('gulp-webpack');
var webpackConfig = require('./webpack.config');

var myJsFiles          = ['js/*.js'];    // Holds the js files to be concatenated

var onError = function(err) {
    notify.onError({
      title:    "Gulp error in " + err.plugin,
      message:  err.toString()
    })(err);
    beeper(0);
    this.emit('end');
    gutil.log(gutil.colors.red(err));
};

gulp.task('styles', function() {
  return gulp.src('styles/*.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['node_modules']
    }))
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false}))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min'}))
    .pipe(gulp.dest('build/css'));
});

gulp.task('templates', function() {
  return gulp.src('pages/*.pug')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(pug())
    .pipe(gulp.dest('build/'));
});

gulp.task('scripts', function(callback) {
  return gulp.src(myJsFiles)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('build/js'));

  // return gulp.src(myJsFiles.concat(jsVendorFiles))
  //   .pipe(plumber({ errorHandler: onError }))
  //   .pipe(sourcemaps.init())
  //   .pipe(babel())
  //   .pipe(gconcat('bundle.js'))
  //   .pipe(uglify())
  //   .pipe(sourcemaps.write())
  //   .pipe(rename({ suffix: '.min'}))
  //   .pipe(gulp.dest('build/js'));
});

gulp.task('images', function() {
  gulp.src('img/**/*')
  // .pipe(cache(imagemin({
    // optimizationLevel: 3,
    // progressive: true,
    // interlaced: true
  // })))
  .pipe(gulp.dest('build/img/'));
});

gulp.task('fonts', function() {
  gulp.src('fonts/**/*')
    .pipe(gulp.dest('build/fonts/'));
});

gulp.task('robots', function() {
  gulp.src('./robots.txt')
    .pipe(gulp.dest('build/'));
});

gulp.task('sitemap', function() {
  gulp.src('./sitemap.xml')
    .pipe(gulp.dest('build/'));
});

gulp.task('default', function() {
  console.log("Use 'gulp setup' command to initialize the project files");
});

gulp.task('setup', function() {
  gulp.start('styles', 'templates', 'scripts', 'images', 'fonts', 'robots', 'sitemap');
});

gulp.task('watch', ['setup'], function() {
  gulp.watch('styles/**/*', ['styles']);
  gulp.watch(['templates/**/*', './pages/**/*'], ['templates']);
  gulp.watch('js/**/*', ['scripts']);
  gulp.watch('img/**/*', ['images']);

  // init server
  browserSync.init({
    server: {
      proxy: "local.build",
      baseDir: "build/"
    }
  });

  gulp.watch(['build/**'], browserSync.reload);
});
