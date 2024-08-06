const gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    htmlmin = require('gulp-htmlmin'),
    templateCache = require('gulp-angular-templatecache'),
    cleanCSS = require('gulp-clean-css'),
    browsersync = require("browser-sync").create();

function browserSync(done) {
    done();
}

function templatecache() {
    return gulp.src([
        'src/pages/*/*.html',
        'src/*/*.html'
    ]).pipe(templateCache({standalone: true}))
        .pipe(gulp.dest('./dist/templates'))
        .pipe(notify({message: 'Template cache task complete'}));
}


function vendor_css() {
    return gulp.src([
        'css/vendor/bootstrap.css',
    ]).pipe(concat('vendor.css'))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(notify({message: 'Vendor CSS Minify task complete'}));
}

function turtle_css() {
    return gulp.src([
        'css/*.css',
    ]).pipe(concat('turtle.css'))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(notify({message: 'Turtle CSS Minify task complete'}));
}

// Turtle Scripts
function turtle_scripts() {
    return gulp.src([
        'src/pages/*/*.js',
        'src/*/*.js',
        'js/app.modules.js',
        'js/app.js',
    ])
        .pipe(concat('turtle.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
        .pipe(notify({message: 'Turtle Scripts task complete'}));
}

// Clean
function clean() {
    return gulp.task('clean', function (cb) {
        del(['./dist/*'], cb);
    });
}

// Watch files
function watchFiles() {
    gulp.watch('src/*/*.html', templatecache);
    gulp.watch('src/pages/*/*.html', templatecache);
    gulp.watch('css/vendor/*.css', vendor_css);
    gulp.watch('css/*.css', turtle_css);

    gulp.watch('js/*.js', turtle_scripts);
    gulp.watch('src/*/*.js', turtle_scripts);
    gulp.watch('src/pages/*/*.js', turtle_scripts);

}


const watch = gulp.parallel(watchFiles, browserSync);

exports.watch = watch;