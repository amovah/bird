var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var rm = require('gulp-rimraf');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifier = require('gulp-clean-css');
// var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var config = require('./src/config.json');

gulp.task('clean', function() {
  return gulp.src('build', { read: false })
        .pipe(rm());
});

gulp.task('copy', function() {
  return [
    gulp.src(['src/config.json'])
    .pipe(gulp.dest('build')),

    gulp.src(['src/public/**/*', '!src/public/js'])
    .pipe(gulp.dest('build/public/')),

    gulp.src('src/views/**/*')
    .pipe(gulp.dest('build/views'))
  ];
});

gulp.task('babel', ['clean'], function() {
  return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('build'));
});

gulp.task('lint', function() {
  return gulp.src('src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('less', ['clean'], function() {
  return gulp.src('src/public/css/*.less')
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(minifier())
        .pipe(gulp.dest('build/public/css'));
});

gulp.task('dev:replace', ['less'], function() {
  return gulp.src('build/public/css/**')
        .pipe(replace(/rootpath/g, config.devServer))
        .pipe(gulp.dest('build/public/css'));
});

gulp.task('prod:replace', ['less'], function() {
  return gulp.src('build/public/css/**')
        .pipe(replace(/rootpath/g, config.prodServer))
        .pipe(gulp.dest('build/public/css'));
});


gulp.task('prod', ['clean', 'lint', 'babel', 'less', 'prod:replace'], function() { //eslint-disable-line
  return gulp.start('copy');
});

gulp.task('dev', ['clean', 'babel', 'less', 'dev:replace'], function() { // eslint-disable-line
  return gulp.start('copy');
});

gulp.task('watch', function() {
  gulp.watch('src/**/*', ['dev']);
});
