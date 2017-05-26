/*
 * Created by https://github.com/YMFL on 2017/5/18.
 */
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    clean = require('gulp-clean'),
    open = require('gulp-open'),
    minifyJS = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    minifyHTML = require('gulp-htmlmin');

var DIST ='build';
var reload = browserSync.reload;
//编译任务
//编译less为css文件
gulp.task('less', less);
//拷贝图片资源
gulp.task('copy',['clean'],function(){
    gulp.src(['src/**/*.{png,gif,jpg,ico}'])
        .pipe(gulp.dest(DIST));
});
gulp.task('clean', function () {
    return gulp.src(DIST, {read: false})
        .pipe(clean());
});
gulp.task('open', function(){
    gulp.src(__filename)
        .pipe(open({uri: 'http://localhost:2017'}));
});
gulp.task('js',['clean'], function(){
    return gulp.src('src/**/*.js')
        .pipe(minifyJS())
        .pipe(gulp.dest(DIST));
});
gulp.task('css',['clean'], function(){
    return gulp.src('src/**/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest(DIST));
});
gulp.task('html',['clean'],function () {
    return gulp.src('src/**/*.html')
        .pipe(minifyHTML({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(DIST));
});

//脚本任务
gulp.task('serve', ['less','open'], serve);
gulp.task('default', ['serve']);
gulp.task('build',['less','js','css','html','copy'])


function serve() {
    browserSync({
        server: {
            baseDir: './src/'
        },
        port:2017
    });
    gulp.watch("src/less/**/*.less", ['less']);
    gulp.watch(['src/html/*.html', 'src/css/*.css', 'src/less/**/*.less', 'src/js/**/*.js'], reload);

}

function less() {
    gulp.src('src/less/*.less')
        .pipe(plugins.less({ compress: true }))
        .on('error', function(e) { console.log(e); })
        .pipe(gulp.dest('./src/css/'));
}
