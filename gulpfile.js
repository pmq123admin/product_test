//1. 导入所需模块
const gulp = require('gulp');
const html = require('gulp-htmlmin');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imgmin = require('gulp-imagemin');
const babel = require('gulp-babel');

//2. 发布任务
// function fnTest(){
//     console.log('hello test ok');
// }

//copy 首页的任务
function fnCopyIndex(){
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'));
}
//处理css的任务
function fnCss(){
    return gulp.src('./src/sass/*.css')
        .pipe(cssnano())
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest('./dist/css'));
}
//处理js的任务
function fnJS(){
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./dist/js'));
}

//处理图片的任务
function fnImg(){
    return gulp.src('./src/img/*')
    .pipe(imgmin())
    .pipe(gulp.dest('./dist/img'));
}

//处理html页面
function fnHTML(){
    return gulp.src('./src/pages/*.html')
    .pipe(html())
    .pipe(gulp.dest('./dist/pages'));
}

//监听任务
function fnWatch(){
    gulp.watch('./src/index.html',fnCopyIndex);
    gulp.watch('./src/sass/*.css',fnCss);
    gulp.watch('./src/js/*.js',fnJS);
    gulp.watch('./src/pages/*.html',fnHTML);
}
//3. 导出模块
// exports.test = fnTest;
exports.copyIndex = fnCopyIndex;
exports.css = fnCss;
exports.js = fnJS;
exports.img = fnImg;
exports.html = fnHTML;
exports.default = fnWatch;