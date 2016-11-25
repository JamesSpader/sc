//create gulp object,modules
var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var minifyhtml = require("gulp-minify-html");
var sass = require("gulp-sass");
var livereload = require("gulp-livereload");
var imgmin = require("gulp-imagemin");
var cssmin = require("gulp-uglifycss");
var htmlPath = require("gulp-rewrite-image-path");
var cssurl = require("gulp-rewrite-css");

var src = "src";
var dist = "dist";

//jason객체 경로
var paths = {
  s_img: src + "/images/**/*.*",
  d_img: dist + "/images",
  s_sass: src + "/sass/*.scss",
  d_css: dist + "/css",
  s_js: src + "/js/*.js",
  d_js: dist + "/js",
  s_html: src + "/**/*.html",
  d_html: dist + "/"
  
//  sass: src + "/sass/*.scss"
};
gulp.task("js-min",function(){
  return gulp.src(paths.s_js)
            .pipe(uglify())
            .pipe(gulp.dest(paths.d_js));
});

gulp.task("img-min", function () {
   return gulp.src(paths.s_img)
            .pipe(imgmin())
            .pipe(gulp.dest(paths.d_img));
});

function errFnc(error){
  console.log(error.toString())
  this.emit('end');
}

gulp.task("cmp-sass", function(){
    return gulp.src(paths.s_sass)
              .pipe(sass())              
              .on("error",errFnc)
              .pipe(cssmin())
              .pipe(gulp.dest(paths.d_css));
});
gulp.task("html-min",function() {
  return gulp.src(paths.s_html)
            //.pipe(minifyhtml())
            .pipe(htmlPath({path:"images"}))
            .pipe(gulp.dest(paths.d_html));
});

gulp.task("watch",function(){
  livereload.listen();
  gulp.watch(paths.s_img,["img-min"]);
  gulp.watch(paths.s_sass,["cmp-sass"]);
  gulp.watch(paths.s_js,["js-min"]);
  gulp.watch(paths.s_html,["html-min"]);
  gulp.watch(dist + '/**').on('change', livereload.changed);

});


gulp.task("default", ["img-min","watch","js-min","html-min"], function () {
  return console.log("gulp task complete");
});


//
//
//gulp.task("comp-sass",function() {
//  return gulp.src(paths.sass)
//            .pipe(sass())
//            .pipe(gulp.dest(dist + "/css"));
//});
//gulp.task("watch",function(){
//  livereload.listen();
//  gulp.watch(src + "/**/*.html",["mini-html"]);
//  gulp.watch(src + "/sass/*.scss", ["comp-sass"]);
//  
//});


//gulp.task("default",["mini-html","comp-sass","watch"],function(){
//  return console.log("===========task end==========");
//});














/*//use function with task method
gulp.task("hello",function(){
  return console.log("hello world");
});

gulp.task("welcome",function(){
  return console.log("welcome to my world");
});
//default array
gulp.task("default",["hello","welcome"], function(){
  return console.log("======gulp task end====="); //callback function
});*/



