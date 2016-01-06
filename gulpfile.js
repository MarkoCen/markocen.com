var gulp = require('gulp')
    , concat = require('gulp-concat')
    , concatCSS = require('gulp-concat-css')
    , less = require('gulp-less')
    , minifyCSS = require('gulp-minify-css')
    , rename = require('gulp-rename')
    , path = require('path')

gulp.task('less-vendor', function () {
    return gulp.src('./less/vendor/*')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'vendor')]
        }))
        .pipe(concatCSS('vendor.css'))
        .pipe(minifyCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(path.join(__dirname, 'public/css')))
})

gulp.task('less-own', function () {
    return gulp.src('./less/own/*')
        .pipe(less({}))
        //.pipe(minifyCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(path.join(__dirname, 'public/css')))
})

gulp.task('bundle-base', function () {
    return gulp.src('./public/js/base.js')
        .pipe(gulp.dest('./public/dist'))
})