'use strict'

const PATHS = {
  js: ['*.js', '*/*.js', '*/**/*.js', '!node_modules/**'],
  json: ['*.json', '*/*.json', '*/**/*.json', '!node_modules/**'],
  specs: ['specs/*.js', 'specs/**/*.js']
}

let gulp = require('gulp')
let mocha = require('gulp-mocha')
let jshint = require('gulp-jshint')
let plumber = require('gulp-plumber')
let jsonlint = require('gulp-json-lint')
let standard = require('gulp-standard')

gulp.task('js-lint', function () {
  return gulp.src(PATHS.js)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
})

gulp.task('json-lint', function () {
  return gulp.src(PATHS.json)
    .pipe(plumber())
    .pipe(jsonlint({
      comments: true
    }))
    .pipe(jsonlint.report())
})

gulp.task('standard', function () {
  return gulp.src(PATHS.js)
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
})

gulp.task('run-tests', function () {
  return gulp.src(PATHS.specs)
    .pipe(mocha({reporter: 'spec'}))
})

gulp.task('lint', ['js-lint', 'json-lint', 'standard'])
gulp.task('test', ['lint', 'run-tests'])
gulp.task('default', ['test'])
