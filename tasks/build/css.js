var fs                       = require('fs'),
gulp                         = require('gulp'),
plumber                      = require('gulp-plumber'),
notify                       = require('gulp-notify'),

// SCSS
postcss                      = require('gulp-postcss'),
syntaxScss                   = require('postcss-scss'),
sass                         = require('gulp-sass'),
sourcemaps                   = require('gulp-sourcemaps'),

// Extansions
rucksack                     = require('rucksack-css'),
uncss                        = require('gulp-uncss'),
lost                         = require('lost'),

// Code Fixes
postcss_normalize            = require('postcss-normalize'),
flexbugs                     = require('postcss-flexbugs-fixes'),
doiuse                       = require('doiuse'),
immutableCss                 = require('immutable-css'),
postcss_sorting              = require('postcss-sorting'),

// Optimization
mqpacker                     = require('css-mqpacker'),
postcss_merge_rules          = require('postcss-merge-rules'),
postcss_merge_longhand       = require('postcss-merge-longhand'),
strip                        = require('postcss-discard-comments'),
cssnano                      = require('cssnano'),

// Stats
cssstats                     = require('cssstats'),
statsReporter                = require('postcss-stats-reporter'),
browserSync                  = require('browser-sync').create();

module.exports  = function() {

    var processors           = [
        postcss_normalize, // Reset Code For Cross-Browser Use
        rucksack({ // Responsive Fonts
            fallbacks: true, // Activate Autoprefixer
        }),
        postcss_sorting(),
        postcss_merge_rules,
        postcss_merge_longhand, // Merge CSS rules, like margin / padding
        strip, // Remove Comments
        mqpacker({
            sort: true,
        }),
        cssstats(),
        cssnano(),
    ];

    return gulp.src('scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors, {syntax: syntaxScss}))
    .pipe(sourcemaps.write('/.'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream({
        once: true
    }))
    .pipe(notify('Styles Done! :) '));

};

module.exports.dependencies  = [ ];
