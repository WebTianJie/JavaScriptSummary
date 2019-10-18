//document.querySelector();
//document.querySelectorAll();
//都可以通过类似css样式一样,来选择元素,十分方便
//缺点:选择的元素不是实时的,如果选出来的元素被修
//改或者删除,新增之后,选择的元素并不会修改还是之前选择的,只能操作选出来之后的元素
//html元素的继承关系
//document-->HTMLDocument.prototype-->Document.prototype:
//事件:
//兼容性写法
//function addEvent(ele,type,handle){
//	if(ele.addEventListener){
//		ele.addEventListener(type,handle,false);
//	}else if(ele.attachEvent){
//		ele.attachEvent('on'+type,function(){\
//		  handle.call(ele);
//		})
//	}else{
//		ele['on'+type]=handle;
//	}
//}
//解除绑定事件
//ele.removeEventListener(type,fn,false);fn必须是外面声明的函数,不能是匿名函数
//ele.detachEvent('on',type,fn);fn必须是外面声明的函数,不能是匿名函数
//onclick=null;
//事件处理模型
//addEventListener('click',fn,false)
//第三个参数,是开启事件冒泡还是开启事件捕获,事件捕获先触发父级,冒泡先触发自己.goole-firfox-ie(还没实现2007年的时候)
// 符合先捕获后冒泡的选择,当时当执行的触发的事件的元素的时候,会先事件执行,谁先绑定,先执行谁
//冒泡 从当前元素到父元素(代码结构上的父子关系)
//取消冒泡
//event.stopPropagation();
//event.cancelBuddle=true;
//捕获从父元素到本元素(代码结构上)
//默认事件
//阻止默认事件
//document.oncontextmenu=function(){
//	return false;
//}
//document.oncontextmenu=function(e){
//	 e.preventDefault();
//}
//document.oncontextmenu=function(e){
//	 e.returnValue=false;
//}
//function cancelHandele(event){
//	if(event.preventDefault){
//		event.preventDefault();
//	}else{
//		e.returnValue=false;
//	}
//}
//事件源对象
//document.onclick=function(e){
//	var event=e||window.event;
//	var obj=|event.target||event.srcElement;
//	
//	 e.preventDefault();
//}
//键盘事件
//keydown和keypress的区别
//keydown会首先触发,有charCode,可以检测到所有键盘的按键除了fn功能键,检测字符类按键,并且区不分大小写的
//keypress只能检测字符类按键,区分大小写,keypress的事件可以转换成字符String.fromCharCode(e.charCode)
//正则表达式
//var reg=/abc/i;//i忽略大小写g,全局匹配,m多行匹配
//reg.test()//test是正则表达式上面的方法
//var str="jhkashkalsh";
//str.match(reg);//match是字符串上的方法
//var regm=/^a/gm;
//var str="abcde\na";//不加m的话只能匹配第一个a加了之后可以匹配最后一个a
//var reg1=new RegExp(reg,'i');//如果不加new的话,表明的是同一个引用
//[\s\S]//表示一切字符,一个字符和字符的补集
//reg.exec();
	//var reg=/ab/g;//如果不加g的话,不会向后匹配
	//var str="ababababab";
	//console.log(reg.lastIndex);//匹配的位置(下标)
	//console.log(reg.exec(str));//匹配的结果
	//子表达式
//	var str="aaaa";
//	var reg=/(\w)\1/g;
//	\1是代表小括号中表达式的值,括号中的是子表达式,1表示第一个子表达式
//	reg.exec();//返回的类数组中,获取出来子表达式的值
    //如果是字符串的str.match(reg)方法,不加g的话,可以正常匹配,如果加了g的话,则只能匹配到第一个,不再匹配子表达式的的信息
    //str.search();//返回匹配到的位置,匹配不到返回-1
//  var reg=/-(\w)/g;
//  var str="the-first-name";
//  str.replace(reg,function($,$1){
//  	return $1.toUpperCase();
//  })
//正向预查
var str="abaaaa";
var  reg=/a(?=b)/g;
var  reg=/a(?!b)/g;

