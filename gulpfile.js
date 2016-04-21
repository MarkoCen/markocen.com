var gulp = require('gulp')
    , concat = require('gulp-concat')
    , concatCSS = require('gulp-concat-css')
    , less = require('gulp-less')
    , postCSS = require('gulp-postcss')
    , postSourceMaps = require('gulp-sourcemaps')
    , autoPrefixer = require('autoprefixer')
    , minifyCSS = require('gulp-minify-css')
    , rename = require('gulp-rename')
    , path = require('path')
    , watch = require('gulp-watch');

var base = [
    path.join(__dirname, 'node_modules/jquery/dist/jquery.min.js'),
    path.join(__dirname, 'node_modules/bootstrap/dist/js/bootstrap.min.js')
];

gulp.task('less-vendor', function () {
    watch('./less/vendor/*', {}, function () {
        console.log('[LESS-VENDOR] Start Building');
        gulp.src('./less/vendor/*')
            .pipe(less({
                paths: [ path.join(__dirname, 'less', 'vendor')]
            }))
            .pipe(concatCSS('vendor.css'))
            .pipe(postSourceMaps.init())
            .pipe(postCSS([ autoPrefixer({ browsers: ['last 3 versions'] }) ]))
            .pipe(postSourceMaps.write('.'))
            .pipe(minifyCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest(path.join(__dirname, 'public/css')))
    });
})

gulp.task('less-own', function () {
    watch('./less/own/*.less', {}, function () {
        gulp.src('./less/own/*.less')
            .pipe(less())
            .pipe(postSourceMaps.init())
            .pipe(postCSS([ autoPrefixer({ browsers: ['last 3 versions'] }) ]))
            .pipe(postSourceMaps.write('.'))
            //.pipe(minifyCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest(path.join(__dirname, 'public/css')))
    });
})

gulp.task('less-global', function () {
    watch('./less/global.less', {}, function () {
        console.log('[LESS-GLOBAL] Start Building');
        gulp.src('./less/global.less')
            .pipe(less())
            .pipe(postSourceMaps.init())
            .pipe(postCSS([ autoPrefixer({ browsers: ['last 3 versions'] }) ]))
            .pipe(postSourceMaps.write('.'))
            .pipe(minifyCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest(path.join(__dirname, 'public/css')))
    })
})

gulp.task('bundle-js', function () {
    watch('./public/js/**/*.js', {}, function () {
        console.log('[BUNDLE-JS] Start Building');
        gulp.src(base.concat(['./public/js/**/*.js']))
            .pipe(concat('bundle.js'))
            .pipe(gulp.dest(path.join(__dirname, 'public/dist')))
    })
});

gulp.task('default', function(){
    gulp.run([
        'less-vendor',
        'less-global',
        'less-own',
        'bundle-js']
    )
})