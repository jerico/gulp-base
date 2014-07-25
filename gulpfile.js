var gulp = require('gulp');

var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');
var gulpIgnore = require('gulp-ignore');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('stylus', function() {
  gulp.src('./app/**/*.styl')
    .pipe(gulpIgnore.exclude(/\_.*/))
    .pipe(stylus({ compress: false }))
    .pipe(autoprefixer(
        ["last 2 versions", "> 1%", "ie 8", "ie 7"], 
        { cascade: true })
     )
    .pipe(gulp.dest('./public'))
});

gulp.task('jade', function() {
  gulp.src('./app/**/*.jade')
    .pipe(gulpIgnore.exclude(/\_.*/))
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('./public'))
});

gulp.task('image', function() {
  gulp.src('./app/assets/img/**')
    .pipe(imagemin())
    .pipe(gulp.dest('./public/img'))
});

gulp.task('copy', function() {
  gulp.src('./app/assets/**')
    .pipe(gulp.dest('./public'))
});

gulp.task('javascript', function() {
  gulp.src('./app/js/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/js'));

  gulp.src('./vendor/*.js')
    .pipe(uglify())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function() {
  gulp.watch(['./app/**/*.styl'], ['stylus'])
  gulp.watch(['./app/**/*.jade'], ['jade'])
  gulp.watch(['./app/assets/**'], ['copy'])
  gulp.watch(['./public/*'], ['reload'])
});

gulp.task('reload', function() {
  connect.reload();
});

gulp.task('server', function() {
  connect.server({ 
    root: 'public',
    livereload: true 
  });
});

gulp.task('default', ['javascript', 'copy', 'image', 'stylus', 'jade', 'watch', 'server']);



