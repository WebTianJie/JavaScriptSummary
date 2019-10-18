define(function(require,exports,moudle){
	var msg=m4;
	//同步加载
	var m2=require('./modules/m2');
	m2.bar;
	var m4=require('./modules/m4');
	m4.m4();
})