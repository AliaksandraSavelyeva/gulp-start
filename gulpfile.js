let gulp = require('gulp'),        //переменная для галпа
    sass = require('gulp-sass');   //переменная для плагина перевода scss в css

gulp.task('scss', function() {              //таск для перевода scss в css с использованием плагина
    return gulp.src('app/scss/**/*.scss')   //взять все файлы с разрешением .scss в директории
        .pipe(sass({outputStyle: 'expanded'}))   //опции compressed/expanded - выгрузить в сжатом/приличном виде
        .pipe(gulp.dest('app/css'))         //выгрузить результат в указанную папку
});

gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))     //наблюдатель, при изменении
});