/**
 * Gulp Setup
 * 
 * The recipe provides:
 * 
 * - A local server
 * - SASS -> CSS
 * - Jade (Pug) templating
 * - A LiveReload server to trigger browser refresh upon saving
 * - A deploy task for uploading to GitHub Pages
 *
 * Run "gulp" to start the default task, which builds the site and serves it.
 * Run with the command line flag "gulp -p" or "gulp --production" to enable
 * uglification of JS code. It is helpful while developing to NOT uglify code. 
 */


// -- PATHS --------------------------------------------------------------------

var src = "src";
var dest = "build";
var paths = {
    html: {
        src: [src + "/**/*.html"],
        dest: dest
    },
    jade: {
        src: [src + "/**/*.jade"],
        exclude: ["!" + src + "/**/_*.jade"],
        dest: dest
    },
    sass: {
        src: [src + "/scss/**/*.{scss,sass}"],
        include: [],
        dest: dest + "/css"
    },
    copy: {
        src: [src + "/demos/**/*"],
        dest: dest + "/demos"
    },
    js: {
        src: [src + "/js/**/*.js"],
        outputFile: "main.js",
        dest: dest + "/js"
    },
    deploy: {
        src: dest + "**/*"
    }
};


// -- SETUP --------------------------------------------------------------------

// Gulp & gulp plugins
var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var liveReload = require("gulp-livereload");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var newer = require("gulp-newer");
var ghPages = require("gulp-gh-pages");
var open = require("gulp-open");
var gutil = require("gulp-util");
var del = require("del");
var express = require("express");
var path = require("path");
var fs = require("fs");
var runSequence = require("run-sequence");
var gulpif = require("gulp-if");
var pug = require("gulp-pug"); // Pug === Jade templates

// Check the command line to see if this is a production build
var isProduction = (gutil.env.p || gutil.env.production);
console.log("Build environment: " + (isProduction ? "production" : "debug"));


// -- BUILD TASKS --------------------------------------------------------------
// These gulp tasks take everything that is in src/, process them (e.g. turn
// SASS into css) and output them into public/.

// Turn Jade/Pug into HTML
gulp.task("jade", function () {
    return gulp.src(paths.jade.src.concat(paths.jade.exclude))
        .pipe(pug())
        .pipe(gulp.dest(paths.jade.dest))
        .pipe(liveReload());
});

// Turn SASS in src/ into css in build/, autoprefixing CSS vendor prefixes and
// generating sourcemaps.  Pipe changes to LiveReload to trigger a reload.
gulp.task("sass", function () {
    return gulp.src(paths.sass.src)
        .pipe(sourcemaps.init())
            .pipe(sass({ 
                outputStyle: "compressed",
                includePaths: paths.sass.include
            }).on("error", sass.logError))
            .pipe(autoprefixer({
                browsers: [
                    // Matches bootstrap: 
                    // https://github.com/twbs/bootstrap-sass#sass-autoprefixer
                    "Android 2.3",
                    "Android >= 4",
                    "Chrome >= 20",
                    "Firefox >= 24",
                    "Explorer >= 8",
                    "iOS >= 6",
                    "Opera >= 12",
                    "Safari >= 6"
                ],
                cascade: true
            }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.sass.dest))
        .pipe(liveReload());
});

// Combine, sourcemap and uglify JS
gulp.task("js", function() {
    return gulp.src(paths.js.src)
        .pipe(sourcemaps.init())
            .pipe(concat(paths.js.outputFile))
            // Uglify only if we are in a production build
            .pipe(gulpif(isProduction, uglify()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.js.dest))
        .pipe(liveReload());
});

gulp.task("copy", function() {
    return gulp.src(paths.copy.src)
        .pipe(newer(paths.copy.dest))
        .pipe(gulp.dest(paths.copy.dest))
        .pipe(liveReload());
});


// The build task will run all the individual build-related tasks above.
gulp.task("build", [
    "jade",
    "sass",
    "copy",
    "js"
]);


// -- RUNNING TASKS ------------------------------------------------------------
// These gulp tasks handle everything related to running the site.  Starting a
// local server, watching for changes to files, opening a browser, etc.

// Watch for changes and then trigger the appropraite build task.  This also
// starts a LiveReload server that can tell the browser to refresh the page.
gulp.task("watch", function () {
    liveReload.listen(); // Start the LiveReload server
    gulp.watch(paths.jade.src, ["jade"]);
    gulp.watch(paths.js.src, ["js"]);
    gulp.watch(paths.sass.src, ["sass"]);
});

// Start an express server that serves everything in build/ to localhost:8080/.
gulp.task("express-server", function () {
    var app = express();
    app.use(express.static(dest));
    app.listen(8080);
});

// Automatically open localhost:8080/ in the browser using whatever the default
// browser.
gulp.task("open", function() {
    return gulp.src(dest)
        .pipe(open({uri: "http://127.0.0.1:8080"}));
});

// The build task will run all the individual run-related tasks above.
gulp.task("run", [
    "watch",
    "express-server",
    "open"
]);


// -- DEPLOYING TASKS ----------------------------------------------------------
// These gulp tasks handle everything related to deploying the site to live
// server(s).

// Push files in build/ to a gh-pages branch
gulp.task("push:gh-pages", function () {
    return gulp.src(paths.deploy.src)
        .pipe(ghPages({
            remoteUrl: "https://github.com/mikewesthad/selected-teaching-demos.git"
        }));
});

// Build & deploy build/ folder to gh-pages and then clean up
gulp.task("deploy:gh-pages", function () {
    return runSequence("build", "push:gh-pages", "clean:publish");
});


// -- CLEANING TASKS ----------------------------------------------------------
// These gulp tasks handle deleting unnecessary files

gulp.task("clean:dest", function () {
    return del(dest)
});

gulp.task("clean:publish", function () {
    return del(["./.publish"])
});


// -- DEFAULT TASK -------------------------------------------------------------
// This gulp task runs automatically when you don't specify task.

// Build and then run it.
gulp.task("default", function(callback) {
    runSequence("build", "run", callback);
});