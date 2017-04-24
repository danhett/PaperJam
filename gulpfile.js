var del = require('del');
var gulp = require('gulp');
var path = require('path');
var argv = require('yargs').argv;
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('gulp-buffer');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var exorcist = require('exorcist');
var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');

var PHASER_PATH = './node_modules/phaser/build/';
var BUILD_PATH = './build';
var SCRIPTS_PATH = BUILD_PATH + '/scripts';
var SOURCE_PATH = './src';
var STATIC_PATH = './static';
var ENTRY_FILE = SOURCE_PATH + '/index.js';
var OUTPUT_FILE = 'game.js';

var keepFiles = false;

function isProduction() {
    return argv.production;
}

function logBuildMode() {

    if (isProduction()) {
        gutil.log(gutil.colors.green('Running production build...'));
    } else {
        gutil.log(gutil.colors.yellow('Running development build...'));
    }

}


function cleanBuild() {
    if (!keepFiles) {
        del(['build/**/*.*']);
    } else {
        keepFiles = false;
    }
}


function copyStatic() {
    return gulp.src(STATIC_PATH + '/**/*')
        .pipe(gulp.dest(BUILD_PATH));
}


function copyPhaser() {

    var srcList = ['phaser.min.js'];

    if (!isProduction()) {
        srcList.push('phaser.map', 'phaser.js');
    }

    srcList = srcList.map(function(file) {
        return PHASER_PATH + file;
    });

    return gulp.src(srcList)
        .pipe(gulp.dest(SCRIPTS_PATH));

}


function build() {

    var sourcemapPath = SCRIPTS_PATH + '/' + OUTPUT_FILE + '.map';
    logBuildMode();

    return browserify({
            paths: [path.join(__dirname, 'src')],
            entries: ENTRY_FILE,
            debug: true,
            transform: [
                [
                    babelify, {
                        presets: ["es2015"]
                    }
                ]
            ]
        })
        .transform(babelify)
        .bundle().on('error', function(error) {
            gutil.log(gutil.colors.red('[Build Error]', error.message));
            this.emit('end');
        })
        .pipe(gulpif(!isProduction(), exorcist(sourcemapPath)))
        .pipe(source(OUTPUT_FILE))
        .pipe(buffer())
        .pipe(gulpif(isProduction(), uglify()))
        .pipe(gulp.dest(SCRIPTS_PATH));

}


function serve() {

    var options = {
        server: {
            baseDir: BUILD_PATH
        },
        open: false // Change it to true if you wish to allow Browsersync to open a browser window.
    };

    browserSync(options);

    // Watches for changes in files inside the './src' folder.
    gulp.watch(SOURCE_PATH + '/**/*.js', ['watch-js']);

    // Watches for changes in files inside the './static' folder. Also sets 'keepFiles' to true (see cleanBuild()).
    gulp.watch(STATIC_PATH + '/**/*', ['watch-static']).on('change', function() {
        keepFiles = true;
    });

}


gulp.task('cleanBuild', cleanBuild);
gulp.task('copyStatic', ['cleanBuild'], copyStatic);
gulp.task('copyPhaser', ['copyStatic'], copyPhaser);
gulp.task('build', ['copyPhaser'], build);
gulp.task('fastBuild', build);
gulp.task('serve', ['build'], serve);
gulp.task('watch-js', ['fastBuild'], browserSync.reload); // Rebuilds and reloads the project when executed.
gulp.task('watch-static', ['copyPhaser'], browserSync.reload);

/**
 * The tasks are executed in the following order:
 * 'cleanBuild' -> 'copyStatic' -> 'copyPhaser' -> 'build' -> 'serve'
 *
 * Read more about task dependencies in Gulp:
 * https://medium.com/@dave_lunny/task-dependencies-in-gulp-b885c1ab48f0
 */
gulp.task('default', ['serve']);
