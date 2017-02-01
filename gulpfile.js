const gulp      = require('gulp'),
      sass      = require('gulp-sass'),
      uglify    = require('gulp-uglify')
      cssnano   = require('gulp-cssnano'),
      imagemin  = require('gulp-imagemin'),
      cache     = require('gulp-cache'),
      del       = require('del'),
      sequence  = require('run-sequence'),
      babel     = require('gulp-babel'),
      rename    = require('gulp-rename');


// Convert SASS to CSS
gulp.task('sass', function(callback) {
  return gulp.src('src/scss/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('src/css'))
});

// Minify CSS Files
gulp.task('cssnano', function() {
  return gulp.src('src/css/*.css')
  .pipe(cssnano())
  .pipe(rename( path => {
    path.basename += ".min";
    path.extname = ".css";
  }))
  .pipe(gulp.dest('dist/css'))
});

// Minify JS Files
gulp.task('uglify', function() {
  return gulp.src('src/js/*.js')
  .pipe(babel({presets: ['es2015']}))
  .pipe(uglify())
  .pipe(rename( path => {
    path.basename += ".min";
    path.extname = ".js";
  }))
  .pipe(gulp.dest('dist/js'))
});

// Minify Images
gulp.task('images', function() {
  return gulp.src('src/img/*.+(png|jpg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/img'))
});

// Move manifest to dist
gulp.task('manifest', function() {
  return gulp.src('src/manifest.json')
  .pipe(gulp.dest('dist'))
});

// Move html to dist
gulp.task('html', function() {
  return gulp.src('src/*.html')
  .pipe(gulp.dest('dist'))
});

// Clean Task
gulp.task('clean', function() {
  return del.sync('dist');
});

// Build CSS Task
gulp.task('styles', function(callback) {
  sequence('sass',
    'cssnano',
    callback
  );
});

// Watch Task
gulp.task('watch', ['styles'], function() {
  gulp.watch('src/scss/*.scss', ['styles']);
});

// Build Project Task
gulp.task('build', function (callback) {
  sequence('clean',
    ['styles', 'uglify', 'images', 'manifest', 'html'],
    callback
  );
});

// Default Task
gulp.task('default', function(callback) {
  sequence('clean',
    ['uglify', 'images', 'html', 'manifest'],
    'watch',
    callback
  );
});
