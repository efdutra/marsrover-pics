const gulp           = require('gulp')
,     nunjucksRender = require('gulp-nunjucks-render')
,     appData        = require('../util/application-data')
,     plumber        = require('gulp-plumber')
,     gulpTap        = require('gulp-tap')
,     gulpData       = require('gulp-data')
,     fs             = require('fs')
,     frontend       = appData.paths.frontend
,     build          = appData.paths.build;

var currentLanguage = '';

var getViewJson1 = (file)=> {

    var fileName = file.relative.replace(/\//g, '--').replace('.nunj', '')
    ,   fileData = require('../../app' + frontend.data + '/en-us/' + fileName + '.json');

    if(fileName == 'produtos'){
        fileData.subPages = [
            require('../../app' + frontend.data + '/en-us/' + '/produtos--historico-climatico.json'),
            require('../../app' + frontend.data + '/en-us/' + '/produtos--monitoramento-em-tempo-real.json'),
            require('../../app' + frontend.data + '/en-us/' + '/produtos--previsao-do-tempo.json'),
            require('../../app' + frontend.data + '/en-us/' + '/produtos--prognostico-sazonal.json')
        ];
    } else if (fileName.match('produtos--')){
        fileData = {
            data : fileData
        }
    }

    fileData.general = require('../../app' + frontend.data + '/en-us/general.json');

    return fileData;
}

var getViewJson2 = (file)=> {

    var fileName = file.relative.replace(/\//g, '--').replace('.nunj', '')
    ,   fileData = require('../../app' + frontend.data + '/pt-br/' + fileName + '.json');

    if(fileName == 'produtos'){
        fileData.subPages = [
            require('../../app' + frontend.data + '/pt-br/' + '/produtos--historico-climatico.json'),
            require('../../app' + frontend.data + '/pt-br/' + '/produtos--monitoramento-em-tempo-real.json'),
            require('../../app' + frontend.data + '/pt-br/' + '/produtos--previsao-do-tempo.json'),
            require('../../app' + frontend.data + '/pt-br/' + '/produtos--prognostico-sazonal.json')
        ];
    } else if (fileName.match('produtos--')){
        fileData = {
            data : fileData
        }
    }

    fileData.general = require('../../app' + frontend.data + '/pt-br/general.json');
    
    return fileData;
}
var buildView1 = (folder)=>{
    gulp.src(frontend.root + frontend.markup.root + frontend.markup.views + '/**/*.nunj')
        .pipe(plumber({
            handleError: (err) => {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulpData(getViewJson1))
        .pipe(nunjucksRender({
            ext : ".html"
        }))
        .pipe(gulp.dest(build.root + build.markup.root + '/' + folder));

    gulp.src(frontend.root + frontend.markup.root + frontend.markup.templates + '/**/*.nunj')
        .pipe(plumber({
            handleError: (err) => {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest(build.root + build.markup.templates));
}

var buildView2 = (folder)=>{
    gulp.src(frontend.root + frontend.markup.root + frontend.markup.views + '/**/*.nunj')
        .pipe(plumber({
            handleError: (err) => {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulpData(getViewJson2))
        .pipe(nunjucksRender({
            ext : ".html"
        }))
        .pipe(gulp.dest(build.root + build.markup.root + '/' + folder));

    gulp.src(frontend.root + frontend.markup.root + frontend.markup.templates + '/**/*.nunj')
        .pipe(plumber({
            handleError: (err) => {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest(build.root + build.markup.templates));
}

gulp.task('markup', () => {
    var folders = fs.readdirSync('./app' + frontend.data);
    buildView1('en-us');
    buildView2('pt-br');
    // folders.forEach(buildView);
});