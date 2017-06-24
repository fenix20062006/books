//E:\VAMA\DESARROLLOS\Cordova\One
var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del =require('del');
var path =require('path');
var runSequence=require('run-sequence');
var processhtml=require('gulp-processhtml');
var config={ folders:{
                      dist:'dist',
                      assets:'assets'
                     }
            };

var paths={dis:path.join(config.folders.dist),
           assets:path.join(config.folders.dist,config.folders.assets),
           html:path.join(config.folders.dist),
           js:path.join(config.folders.dist,config.folders.assets,'js'),
           fonts:path.join(config.folders.dist,config.folders.assets,'fonts'),
           css:path.join(config.folders.dist,config.folders.assets,'css'),
           img:path.join(config.folders.dist,config.folders.assets,'img'),

          };
var targets ={
               dist:{ environment:'dist',
                       data:{assets:config.folders.assets},
                    },
               dev:{environment:'dev',
                    data:{assets:config.folders.assets}
                  }
           };


gulp.task('LimpiaDist',function()
{
return del(config.folders.dist);
});
gulp.task('html',function ()
{
    /*Indica que se poien los archivos *.html
     y busca esos html dentro de subdirectorios */
    gulp.src(['src/html/**/*.html','!src/html/layout/**/*']).
    pipe(processhtml({
      recursive:true,
      process:true,
      strip:true,
      environment:targets.dev.environment,
      data:targets.dev.data
    })).
    pipe(gulp.dest(path.join(paths.html)))
});
gulp.task('js',function()
{
    gulp.src('src/js/**/*.js').
    pipe(concat('app.min.js')).
    pipe(uglify()).
    pipe(gulp.dest(paths.js));
});
//gulp.task('default',['html','js']);
gulp.task('default',function(){
  runSequence('LimpiaDist',['html','js']);
});
