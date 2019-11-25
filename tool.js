// 
//  tool.js
// 运动
//  
//  Created by Administrator on 2019-01-22.
//  Copyright 2019 Administrator. All rights reserved.
//异步加载js文件
var tools={
			test:function(){
			
			},
			demo:function(){
			}
		}
function loadScript(src,callback){
	var script=document.createElement('script');
		script.type="text/javascript";
		if(script.readyState){
			script.onreadystatechange=function(){
				if(script.readyState=="complete"||script.readyState=="loaded"){
					tools[callback]();//demo.js里面的 方法
				}
			}
		}else{
			script.onload=function(){//除了ie其他浏览器支持
				tools[callback]();//demo.js里面的方法
			}
		}
		script.src=src;
		document.body.appendChild('script');//添加到页面里面的时候才会执行js
		 
}
loadScript(src,'test');
//阻止默认事件
function cencelHandle(event){
	if(event.preventDefault){
		event.preventDefault();
	}else{
		event.returnValue=false;
	}
}
//取消冒泡
function stopBubble(event){
	if(event.stopPropagation){
		event.stopPropagation();
	}else{
		event.cancelBubble=true;
	}
}
//绑定事件
function addEvent(ele,type,handle){
	if(ele.addListener){
		ele.addListener(type,handle,false);
	}else if(ele.attachEvent){
		ele.attachEvent('on'+type,handle,function(){
			handle.call(ele);
		})
	}else{
		ele['on'+type]=handle;
	}
}
//获取滚动条到顶部的距离
function getScrollOffset(){
	if(window.pageXOffset){
		return {
			x:window.pageXOffset,
			y:window.pageYOffset
		}
	}else{
		return {

				x:document.body.scrollLeft+document.documentElement.scrollLeft,
				y:document.body.scrollTop+document.documentElement.scrollTo

		}
	}
	
}
//获取浏览器窗口大小
function getViewOffset(){
	if(window.innerWidth){
		return {
			w:window.innerWidth,
			h:window.innerHeight
		}
	}else{
		if(document.compatMode=='BackCompat'){
			return {
				w:document.body.clientWidth,
				h:document.body.clientHeight
			}
		}else{
			return {
				w:document.documentElement.clientWidth,
				h:document.documentElement.clientHeight
			}
		}
	}
}
//获取样式
function getStyle(ele,prop){
	if(window.getComputedStyle){
		return window.getComputedStyle(ele,null)[prop];
	}else{
		return ele.currentStyle[prop];
	}
}
//匀速运动
function move(dom,target){
	clearInterval(timer);
	var speed=target-dom.offsetLeft>0?7:-7;
	timer=setInterval(function(){
		if(Math.abs(target-dom.offsetLeft)<Math.abs(speed)){
			clearInterval(timer);
			dom.style.left=distance+'px';
		}else{
			dom.style.left=dom.offsetLeft+speed+'px';	
		}
		
	},30);
	
}
//缓冲运动
function bufferMove(dom,target){
	clearInterval(timer);
	var speed;
	timer=setInterval(function(){
		speed=(target-dom.offsetLeft)/10;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		if(dom.offsetLeft==target){
			clearInterval(timer);
		}else{
			dom.style.left=dom.offsetLeft+speed+'px';						
		}
	},30);
}
//获取样式
function getStyle(oDom,attr){
	if(window.getComputedStyle){
		return window.getComputedStyle(oDom,null)[attr];
	}else{
		return oDom.currentStyle[attr];
	}
}
//缓冲运动完美版
function bufferMove(dom,attrObj,callback){
	clearInterval(dom.timer);
	var speed=null,iCurr=null;
	dom.timer=setInterval(function(){
		var isStop=true;
		for(var attr in attrObj){
			if(attr=="opacity"){
				iCurr=parseFloat(getStyle(dom,attr))*100;
			}else{
				iCurr=parseInt(getStyle(dom,attr));
			}
			speed=(attrObj[attr]-iCurr)/10;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(attr=='opacity'){
				dom.style.opacity=(iCurr+speed)/100;
			}else{
				dom.style[attr]=iCurr+speed+'px';
			}
			console.log(attrObj[attr],iCurr);
			if(iCurr!=attrObj[attr]){
				isStop=false;
			}
		}
		if(isStop){
			typeof callback=='function'&&callback();
			clearInterval(dom.timer);
		}
	},30);
}
//弹性运动
function elasticMove(dom,target){
	clearInterval(timer);
	var a=3;
	var speed=0;
	var u=0.8;
	timer=setInterval(function(){
		a=(target-dom.offsetLeft)/10;
		speed+=a;
		speed*=u;
		if(Math.abs(speed)<1&&Math.abs(target-dom.offsetLeft)<1){
			clearInterval(timer);
			dom.style.left=target;
		}else{
			dom.style.left=dom.offsetLeft+speed+'px';	
		}
		
	},30);
}
//弹性运动完美版(模拟重力场)

function elasticMove(dom) {
	clearInterval(dom.timer);
	var a = 3;
	var speedx = 6;
	var speedy = 8;
	var u = 0.8; //能量损失
	var g = 1; //重力加速度
	dom.timer = setInterval(function() {
		speedy += g;
		var newTop = dom.offsetTop + speedy;
		var newLeft = dom.offsetLeft + speedx;
		if(newTop >= document.documentElement.clientHeight - dom.clientHeight) {
			speedy *= -1;
			speedy *= u;
			speedx *= u;
			newTop = document.documentElement.clientHeight - dom.clientHeight;
		}
		if(newTop <= 0) {
			speedy *= -1;
			speedy *= 0.8;
			speedx *= 0.8;
			newTop = 0;
		}
		if(newLeft >= document.documentElement.clientWidth - dom.clientWidth) {
			speedx *= -1;
			speedy *= u;
			speedx *= u;
			newLeft = document.documentElement.clientWidth - dom.clientWidth;
		}
		if(newLeft <= 0) {
			speedx *= -1;
			speedy *= u;
			speedx *= u;
			newLeft = 0;
		}
		if(Math.abs(speedx) < 1) {
			speedx = 0;
		}
		if(Math.abs(speedy) < 1) {
			speedy = 0;
		}

		if(speedx == 0 && speedy == 0 && (newTop == (document.documentElement.clientHeight - dom.clientHeight))) {
			clearInterval(dom.timer);
		} else {
			dom.style.top = newTop  + 'px';
			dom.style.left = newLeft+ 'px';
		}

	}, 30);
}

// 
//  tool.js
//  仿jquery,根据#id,.class,div获取元素
//  
//  Created by Administrator on 2019-01-22.
//  Copyright 2019 Administrator. All rights reserved.
// 
//获取元素的主函数
function getDom(str){
	if(str==null||str.length==0){
		return null;
	}
	if(str.indexOf('#')>-1){
		return getDomById(str);
	}else if(str.indexOf('.')>-1){
		var reg=/^\.\w*/g;
		if(reg.test(str)){
			str=str.replace('.','');
		  getDomByClass(str);
		}
	}else{
		return document.getElementsByTagName(str);
	}
}
//根据id获取元素
function getDomById(id){
	var reg=/^#\w*/g;
	if(reg.test(id)){
		var id=id.slice(1);
	   return 	document.getElementById(id);
	}
}
//根据类名获取函数
function getDomByClass(_className) {
		//Element.prototype.getDomByClassName = Document.prototype.geDomByClassName = document.getElementsByClassName || function(className) {
		//}
		var allDomArray = document.getElementsByTagName('*');
		var domArray = [];
		for(var i = 0; i < allDomArray.length; i++) {
			if(allDomArray[i].className.length > 0) {
				var classArr = delMoreSpace(allDomArray[i].className).split(' ');
				for(var j = 0; j < classArr.length; j++) {
					if(classArr[j] == _className) {
						domArray.push(allDomArray[i])
					}
				}
			}
		}
		return domArray;

}
//去除字符串的首尾空格
function trimspace(str) {
	var reg = /(^\s*)|(\s*$)/g;
	var tempStr = str.replace(reg, function($, $1, $2) {
		return '';
	});
	return tempStr;
}
//字符串的多个连续空格合并为一个
function delMoreSpace(_classStr) {
	var reg = /(\s)\1*/g;
	var tepStr = _classStr.replace(reg, function($, $1) {
		return $1;
	});
	tepStr = trimspace(tepStr);
	return tepStr;
}


//深度克隆
//判断是不是原始值,typeof 
//判断是对象还是数组 instanceof(在父子域的会出问题) tostring
function deepClone(origin,target){
			var target=target||{};
			var toStr=Object.prototype.toString;
			for(var prop in origin){
				if(origin.hasOwnProperty(prop)){
					if(typeof(origin[prop])=="object"&&origin[prop]!==null){
						target[prop]=(toStr.call(origin[prop])=="[object Array]") ?target[prop]=[]:target[prop]={};
						deepClone(origin[prop],target[prop])
						
					}else{
						target[prop]=origin[prop];
					}
				}
			}
			return target;
}


//判断数据的真实类型
function type(target){
	var typeList={
		"[object Array]":"array",
		"[object Object]":"object",
		"[object Number]":"number-object",
		"[object Boolean]":"Boolean-object",
		"[object String]":"string-object"
	}
	if(target==null){
			return 'null';
	}
	if(typeof(target)=="object"){
		var type=Object.prototype.toString.call(target);
		return typeList[type];
	}else{
		return typeof(target);
	}
}
//数组去重
Array.prototype.unique=function(){
	var  temp={},len=this.length,arr;
	for(var i=0;i<len;i++){
		if(!this[i]){
			temp[this[i]]="1";//除了能转转换为false的值以外的值,0,undefined,null等除外
			arr.push(this[i]);
		}
	}
	return arr;
}
