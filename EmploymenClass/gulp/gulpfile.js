var gulp = require('gulp');

//压缩html
var  htmlclean=require('gulp-htmlclean');
//压缩处理图片
var imgMin=require('gulp-imagemin');
//压缩js
var ugliFy=require('gulp-uglify');
//去掉js中的调试语句
var stripDebug=require('gulp-strip-debug');
//less转换为css
var less=require('gulp-less');
//压缩js
var cleanCss=require('gulp-clean-css');
//添加前缀
	var postCss=require('gulp-postcss');
	var autoprefixer=require('gulp-autoprefixer');
//构建本地服务器+
var connect=require('gulp-connect');
//自动监听




var  folder={
	src:'src/',
	dist:'dist/'
}
var devMod=process.env.NODE_ENV=="development";
gulp.task('html',function(){
	var page=gulp.src(folder.src+'html/*')
	.pipe(connect.reload());
	if(!devMod){
		page.pipe(htmlclean());		
	}
	page.pipe(gulp.dest(folder.dist+'html/'));//gulp.dist写入文件里面是文件地址
});
gulp.task('css',function(){
	var page=gulp.src(folder.src+'css/*')
	.pipe(connect.reload())
	.pipe(less());
//	.pipe(postCss([autoprefixer()]))
	if(!devMod){
		page.pipe(cleanCss());
	}
	page.pipe(gulp.dest(folder.dist+'css/'));//gulp.dist写入文件里面是文件地址
});
gulp.task('js',function(){
	var page=gulp.src(folder.src+'js/*')
	.pipe(connect.reload());
	if(!devMod){
		page.pipe(stripDebug());
		page.pipe(ugliFy());
	}
	page.pipe(gulp.dest(folder.dist+'js/'));//gulp.dist写入文件里面是文件地址
});
gulp.task('img',function(){
	gulp.src(folder.src+'images/*')
	.pipe(imgMin())
	.pipe(gulp.dest(folder.dist+'images/'));//gulp.dist写入文件里面是文件地址
});
gulp.task('server',function(){
	connect.server({
		port:8888,
		livereload:true
	});
});
//监听文件变化,当文件被修改的时候,自动打包文件
gulp.task('watch',function(){
	gulp.watch(folder.src+"html/*",['html']);
	gulp.watch(folder.src+"js/*",['js']);
	gulp.watch(folder.src+"css/*",['css']);
})
gulp.task('default',['html','css','js','img','server','watch']);//html为依赖任务,执行default,依赖html