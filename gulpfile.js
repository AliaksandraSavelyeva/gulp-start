let gulp = require('gulp'),        //переменная для галпа
    sass = require('gulp-sass'),   //плагин перевода scss в css
    browserSync = require('browser-sync'),   //плагин browser-sync - live reload браузера
    uglify = require('gulp-uglify'),        //минифицирование файлов
    concat = require('gulp-concat'),        //конкатенация файлов
    rename = require('gulp-rename');        //переименовывание файлов

gulp.task('scss', function() {              //таск для перевода scss в css с использованием плагина
    return gulp.src('app/scss/**/*.scss')   //взять все файлы с разрешением .scss в директории
        .pipe(sass({outputStyle: 'compressed'}))   //опции compressed/expanded - выгрузить в сжатом/приличном виде
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))         //выгрузить результат в указанную папку
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function() {          //таск для отслеживания browser-sync плагином html-файлов
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function() {          //таск для отслеживания browser-sync плагином js-файлов
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function() {        //таск для объединения всех js-плагинов в один сжатый файл
    return gulp.src([                                    // [] - в директории несколько файлов
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
    ])
        .pipe(concat('libs.min.js'))        //объединение
        .pipe(uglify())                          //минифицирование
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream: true}))       //отслеживание js-изменений
});

gulp.task('browser-sync', function() {      //плагин для live reload
    browserSync.init({
        server: { baseDir: 'app/' }
    })
});

gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));     //наблюдатель, при изменении scss файлов
    gulp.watch('app/*.html', gulp.parallel('html'));     //наблюдатель, при изменении html файлов
    gulp.watch('app/js/*.js', gulp.parallel('script'))
});

gulp.task('default', gulp.parallel('scss', 'js', 'browser-sync', 'watch'));     //параллельные таски без заморозки консоли