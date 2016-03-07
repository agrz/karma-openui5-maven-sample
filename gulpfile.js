/**
 * Created by vsouhrada on 23/02/16.
 */
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins(
  {
    pattern: ['gulp-*', 'gulp.*', 'del', 'run-sequence']
  }
);
// TODO - run-sequence can be removed with gulp 4.0 => there will be standard solution for this

var config = {
  bowerComponents: 'bower_components',
  dist_bower_components: 'target/dist/bower_components',
  src: "src/main/javascript",
  dist: "target/dist/webapp",
  test: 'src/test/javascript',
  temp: "target/dist/temp",
  ui5ResourceFolder: "resources"
};

gulp.task('ui5preload', function(){
  return gulp.src([
      config.temp + '/**/**.+(js|xml)'
    ])
    .pipe(plugins.ui5Preload({base:config.temp, namespace:'sap.ui.demo.bulletinboard'}))
    .pipe(gulp.dest(config.temp));
});

gulp.task('clean', function() {
  return plugins.del([config.temp, config.dist + '/' + config.ui5ResourceFolder]);
});

gulp.task('copyDistSrc', function() {
  return gulp.src(config.src + '/**').pipe(plugins.copy(config.dist, {prefix: 3}));
});

gulp.task('copyDevSrc', function() {
  return gulp.src(config.src + '/**').pipe(plugins.copy(config.temp, {prefix: 3}));
});

gulp.task('copyDevTest', function() {
  return gulp.src(config.test + '/**').pipe(plugins.copy(config.temp, {prefix: 3}));
});


gulp.task('copyUI5res', function() {
  var ui5FilesToCopy = [
    config.bowerComponents + '/openui5-sap.m/resources/**',
    config.bowerComponents + '/openui5-sap.ui.core/resources/**',
    config.bowerComponents + '/openui5-sap.ui.layout/resources/**',
    config.bowerComponents + '/openui5-themelib_sap_bluecrystal/resources/**',
  ];

  return gulp.src(ui5FilesToCopy).pipe(plugins.copy(config.dist_bower_components, {prefix: 3}));
});

gulp.task('default', function(cb) {
  plugins.runSequence('copyUI5res', 'lint', 'copyDistSrc', cb);
});

gulp.task('dev', function(cb) {
  plugins.runSequence('copyUI5res', 'copyDevSrc', 'copyDevTest', 'ui5preload', 'open', 'watch', cb);
});

gulp.task('lint', function () {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src([config.src + '/**/*.js', '!node_modules/**', '!' + config.src +'/resources/**'])
    // eslint() attaches the lint output to the "eslint"] property
    // of the file object so it can be used by other modules.
    .pipe(plugins.eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(plugins.eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(plugins.eslint.failAfterError())
    

    .pipe(plugins.notify({ message: 'Lint task complete' }));
});

gulp.task('watch', function() {
  // Watch .js files
  gulp.watch(config.src + '/**/*.js', ['lint']);

});

gulp.task('open', function() {
  gulp.src(config.temp)
    .pipe(plugins.serverLivereload({
      defaultFile: 'test/testService.html',
      livereload: true,
      directoryListing: false,
      open: true
    }));
});