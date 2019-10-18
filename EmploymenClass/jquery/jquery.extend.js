//1:扩展插件$.extend({myfn:function(){console.log('我也是自定义的工具方法2');}});//一个参数
//2:浅层克隆$.extend(obj1,obj2);//至少两个参数
//3:深层克隆$.extend(true,obj1,obj2);//至少三个参数

//jQuery.fn = jQuery.prototype
$.extend=function{
	//target,被操作对象
	//扩展插件;target=this;
	//浅层克隆;$.extend(obj1,obj2);target=arguments[0]
	//3:深层克隆$.extend(true,obj1,obj2);//target=argument[1];
}
//jqury参数
$('<div>/',
	{
		html: 'yudi',
		css: {color:'red',fontSize:'60px'},
		dataId: '1001',
		id:'demo'
	}
).appendTo($('body'));
//创建标签并且把后面对象中的属性赋值给创建的标签,如果没有改属性则通过attr()进行自定义属性的赋值
