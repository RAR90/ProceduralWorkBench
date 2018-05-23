// /////////////////////////////////////////////////////////////////////
// Execute: npm install browser-sync gulp-notify gulp-concat gulp-uglify pump gulp-uglifycss gulp-css-format gulp-jsbeautify gulp-util vinyl-ftp gulp-flatten gulp-html-beautify gulp-strip-comments gulp
// /////////////////////////////////////////////////////////////////////

var gulp         = require('gulp'),
    browserSync  = require('browser-sync').create(),
    notify       = require('gulp-notify'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    pump         = require('pump'),
    uglifycss    = require('gulp-uglifycss'),
    cssFormat    = require('gulp-css-format'),
    beautify     = require('gulp-jsbeautify'),
    gutil        = require('gulp-util'),
    flatten      = require('gulp-flatten'),
    htmlbeautify = require('gulp-html-beautify'),
    strip        = require('gulp-strip-comments');

// /////////////////////////////////////////////////////////////////////
// DEFAULT ASSETS
// /////////////////////////////////////////////////////////////////////

/* Browsersync options */
var options = {
    proxy:'YOUR_SERVER_PATH/dist',
    notify: true,
    reloadDelay: 0,
    open: 'local',
    online: true
};

var beautifyEnable = false;

var HTMLoutPutConfig = {
    "eol": "\n",
    "indent_level": 0,
    "indent_with_tabs": true,
    "preserve_newlines": true,
    "max_preserve_newlines": 0,
    "space_after_anon_function": true,
    "brace_style": "collapse",
    "keep_array_indentation": true,
    "keep_function_indentation": true,
    "space_before_conditional": true,
    "break_chained_methods": false,
    "unescape_strings": false,
    "wrap_line_length": 0,
    "wrap_attributes": "auto",
    "wrap_attributes_indent_size": 4,
    "end_with_newline": false
};

/* Files to be merged */
var src = {
    plugins: {
        css: 'src/plugins/**/*.css',
        js: 'src/plugins/**/*.js'
    },
    scripts: [
        'src/app/*.js',
        'src/pages/**/*.js',
        'src/partials/**/*.js'
    ],
    style: [
        'src/app/*.css',
        'src/pages/**/*.css',
        'src/partials/**/*.css'
    ],
    php: {
        pages: [
            'src/pages/**/*.php'
        ],
        partials: [
            'src/partials/**/*.php'
        ],
        app: [
            'src/app/*.php'
        ]
    },
    images: [
        'src/app/assets/*.{gif,jpg,png,svg}',
        'src/pages/**/*.{gif,jpg,png,svg}',
        'src/partials/**/*.{gif,jpg,png,svg}',
        'src/plugins/**/*.{gif,jpg,png,svg}'
    ],
    files: [
        'src/files/*.*'
    ]
};

/* Files merged destination */
var dist = {
    css: 'dist/includes/',
    js: 'dist/includes/',
    php: {
        pages: './dist/',
        app: './dist/includes/',
        partials: './dist/includes/'
    },
    imgs: './dist/imgs',
    files: './dist/files'
};

/* Theme files moving */
var theme = {
    src: 'src/theme/*.css',
    dist: './dist/includes/'
};

// /////////////////////////////////////////////////////////////////////
// Browser Sync Task
// /////////////////////////////////////////////////////////////////////
gulp.task('BrowserSync', function() {
    browserSync.init(options);
});

// /////////////////////////////////////////////////////////////////////
// Move Images
// /////////////////////////////////////////////////////////////////////
gulp.task('MoveImages', function () {
    return gulp.src(src.images)
    .pipe(flatten())
    .pipe(gulp.dest(dist.imgs));
});

// /////////////////////////////////////////////////////////////////////
// Move Files
// /////////////////////////////////////////////////////////////////////
gulp.task('MoveFiles', function () {
    return gulp.src(src.files)
    .pipe(flatten())
    .pipe(gulp.dest(dist.files));
});

// /////////////////////////////////////////////////////////////////////
// Zip Plugin Files
// /////////////////////////////////////////////////////////////////////
gulp.task('ZipPluginsScripts', function (cb) {
    pump([
            gulp.src(src.plugins.js),
            concat('plugins.min.js'),
            uglify(),
            gulp.dest(dist.js)
        ],
        cb
    ).pipe(browserSync.reload({stream:true}));
});
gulp.task('ZipPluginsStyles', function (cb) {
    pump([
            gulp.src(src.plugins.css),
            concat('plugins.min.css'),
            uglifycss({
                "maxLineLen": 200,
                "uglyComments": true
            }),
            gulp.dest(dist.css)
        ],
        cb
    ).pipe(browserSync.reload({stream:true}));
});

// /////////////////////////////////////////////////////////////////////
// Merge and Zip Files to create scripts.min.js
// /////////////////////////////////////////////////////////////////////
gulp.task('ZipScripts', function (cb) {
    pump([
            gulp.src(src.scripts),
            concat('scripts.min.js'),
            uglify(),
            gulp.dest(dist.js)
        ],
        cb
    ).pipe(browserSync.reload({stream:true}));
});

// /////////////////////////////////////////////////////////////////////
// Merge and Zip Files to create style.min.js
// /////////////////////////////////////////////////////////////////////
gulp.task('ZipStyles', function (cb) {
    pump([
            gulp.src(src.style),
            concat('style.min.css'),
            uglifycss({
                "maxLineLen": 200,
                "uglyComments": true
            }),
            gulp.dest(dist.css)
        ],
        cb
    ).pipe(browserSync.reload({stream:true}));
});

// /////////////////////////////////////////////////////////////////////
// Copy PHP files to Dist folder
// /////////////////////////////////////////////////////////////////////
gulp.task('PHPDistPages', function (cb) {
    if (beautifyEnable === true) {
        pump([
                gulp.src(src.php.pages),
                flatten(),
                htmlbeautify(HTMLoutPutConfig),
                strip(),
                gulp.dest(dist.php.pages)
            ],
            cb
        )
        .pipe(browserSync.reload({stream:true}));
    }else {
        pump([
                gulp.src(src.php.pages),
                flatten(),
                gulp.dest(dist.php.pages)
            ],
            cb
        )
        .pipe(browserSync.reload({stream:true}));
    }
});
gulp.task('PHPDistApp', function (cb) {
    if (beautifyEnable === true) {
        pump([
                gulp.src(src.php.app),
                flatten(),
                htmlbeautify(HTMLoutPutConfig),
                strip(),
                gulp.dest(dist.php.app)
            ],
            cb
        )
        .pipe(browserSync.reload({stream:true}));
    } else {
        pump([
                gulp.src(src.php.app),
                flatten(),
                gulp.dest(dist.php.app)
            ],
            cb
        )
        .pipe(browserSync.reload({stream:true}));
    }
});
gulp.task('PHPDistPartials', function (cb) {
    if (beautifyEnable === true) {
        pump([
                gulp.src(src.php.partials),
                flatten(),
                htmlbeautify(HTMLoutPutConfig),
                strip(),
                gulp.dest(dist.php.partials)
            ],
            cb
        )
        .pipe(browserSync.reload({stream:true}));
    } else {
        pump([
                gulp.src(src.php.partials),
                flatten(),
                gulp.dest(dist.php.partials)
            ],
            cb
        )
        .pipe(browserSync.reload({stream:true}));
    }
});

// /////////////////////////////////////////////////////////////////////
// Copy theme files
// /////////////////////////////////////////////////////////////////////
gulp.task('DistThemes', function (cb) {
    pump([
            gulp.src(theme.src),
            flatten(),
            gulp.dest(theme.dist)
        ],
        cb
    )
    .pipe(browserSync.reload({stream:true}));
});

// /////////////////////////////////////////////////////////////////////
// Start Watchers
// /////////////////////////////////////////////////////////////////////
gulp.task('Watcher', function () {
    gulp.watch(src.scripts, ['ZipScripts']);
    gulp.watch(src.style, ['ZipStyles']);
    gulp.watch(src.plugins.js, ['ZipPluginsScripts']);
    gulp.watch(src.plugins.css, ['ZipPluginsStyles']);
    gulp.watch(src.php.pages, ['PHPDistPages']);
    gulp.watch(src.php.partials, ['PHPDistPartials']);
    gulp.watch(src.php.app, ['PHPDistApp']);
    gulp.watch(theme.src, ['DistThemes']);
    gulp.watch(src.images, ['MoveImages']);
    gulp.watch(src.files, ['MoveFiles']);
});

// /////////////////////////////////////////////////////////////////////
// Start Tasks
// /////////////////////////////////////////////////////////////////////
gulp.task('default', [
    'ZipScripts',
    'ZipStyles',
    'ZipPluginsScripts',
    'ZipPluginsStyles',
    'PHPDistPages',
    'PHPDistPartials',
    'PHPDistApp',
    'DistThemes',
    'MoveImages',
    'MoveFiles',
    'BrowserSync',
    'Watcher'
]);
