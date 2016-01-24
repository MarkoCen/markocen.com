var gulp = require('gulp')
    , concat = require('gulp-concat')
    , concatCSS = require('gulp-concat-css')
    , less = require('gulp-less')
    , minifyCSS = require('gulp-minify-css')
    , rename = require('gulp-rename')
    , path = require('path')
    , watch = require('gulp-watch')

gulp.task('less-vendor', function () {
    return gulp.src('./less/vendor/*')
        .pipe(watch('./less/vendor/*', function(){
            console.log('FILE-CHANGED, START BUILDING: less-vendor')
        }))
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'vendor')]
        }))
        .pipe(concatCSS('vendor.css'))
        .pipe(minifyCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(path.join(__dirname, 'public/css')))
})

gulp.task('less-own', function () {
    return gulp.src('./less/own/*.less')
        .pipe(watch('./less/own/*.less', function () {
            console.log('FILE-CHANGED, START BUILDING: less-own')
        }))
        .pipe(less())
        //.pipe(minifyCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(path.join(__dirname, 'public/css')))
})

gulp.task('less-global', function () {
    return gulp.src('./less/global.less')
        .pipe(watch('./less/global.less', function () {
            console.log('FILE-CHANGED, START BUILDING: less-global')
        }))
        .pipe(less())
        .pipe(minifyCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(path.join(__dirname, 'public/css')))
})

gulp.task('bundle-js', function () {
    return gulp.src('./public/js/**/*.js')
        .pipe(watch('./public/js/**/*.js', function () {
            console.log('FILE-CHANGED, START BUILDING: bundle-js')
        }))
        .pipe(gulp.dest('./public/dist'))
})

gulp.task('default', function(){
    gulp.run([
        'less-vendor',
        'less-global',
        'less-own',
        'bundle-js'])
})