var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  apidoc = require('gulp-apidoc');


gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'ayesa.js',
    ext: 'js coffee jade',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'develop'
]);


// Desde consola en el directorio ayesa --> apidoc -i apidoc -o apidoc/documentation/ -t apidoc/template/
gulp.task('apidoc',function(done){
  apidoc({
    src: "apidoc/api/",
      dest: "apidoc/documentation/",
      template: "apidoc/template/",
      debug: true,
      includeFilters: [ ".*\\.js$" ]
  },done);
});
