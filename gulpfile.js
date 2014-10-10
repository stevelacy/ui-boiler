var es = require('ecstatic');
var http = require('http');
var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var reload = require('gulp-livereload');
var prefix = require('gulp-autoprefixer');


gulp.task('stylus', function() {
  gulp.src('./src/**/*.styl')
    .pipe(stylus())
    .pipe(prefix())
    .pipe(gulp.dest('./'))
    .pipe(reload());
});

gulp.task('jade', function() {
  gulp.src('./index.jade')
    .pipe(jade())
    .pipe(gulp.dest('./'))
    .pipe(reload());
});

gulp.task('copy', function() {
  gulp.src(['./src/**/*', '!./src/**/*.jade', '!./src/**/*.styl'])
    .pipe(gulp.dest('./'));
});

gulp.task('server', function(done) {
  var port = 5000;
  var server = http.createServer(es({
    root: './'
  }));
  server.listen(port, done);
});

gulp.task('watch', function() {
  gulp.watch(['./src/**/*.styl'], ['stylus']);
  gulp.watch(['./**/*.jade'], ['jade']);
  gulp.watch(['./**/*.coffee'], ['coffee']);
  gulp.watch(['./src/*', '!./src/*.jade', '!./src/*.styl'], ['copy']);
});

gulp.task('default', ['server', 'stylus', 'jade', 'copy', 'watch']);
