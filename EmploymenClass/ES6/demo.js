var  oInput=document.getElementById('search');
var  oBtn=document.getElementById('btn');
//var keyvalue='';
//
//oInput.oninput=function(){
//	keyvalue=this.value; 
//}
//
//oBtn.onclick=function(){
//	deal(keyvalue);
//}
//function getContent(data){
//	var url="urlxz-a";
//	console.log('发送到'+url+'成功:'+data);
//}
////LI
//function dealFunc(func){
//	return function(data){
//		var  urlB='URL-B';
//		console.log('发送到'+urlB+'成功:'+data);
//		return func.apply(this,arguments);
//	}
//}
//
//
//var deal=new dealFunc(getContent)
@skin
class Search {
	constructor() {
			this.keyvalue = '';
	}
	@myReadOnly
	url="url-a"
	@dealData
	getContent(a,b) {
		console.log('向'+this.url+'发送请求,数据:'+this.keyvalue);
		return 10;
	}
}
//修改私有属性
function myReadOnly(proto,key,descriptor){
	//proto原型,key属性名字,desscritor属性修改器,object.defineProperties()
	descriptor.writable=false;
//	descriptor.initializer();//属性值,url-a
	descriptor.initializer=function(){
		return 6;//url的值被写为6
	}
}
//修改原型上的属性
function dealData(proto,key,descriptor){
	//proto原型,key属性名字,desscritor属性修改器,object.defineProperties()
	var  oldValue=descriptor.value;
	descriptor.value=function(){
		var  urlB='urlB';
		console.log('向'+urlB+'发送请求,数据:'+this.keyvalue);
		return oldValue.apply(this,arguments);
	}
}
function dealData(ms){
	//proto原型,key属性名字,desscritor属性修改器,object.defineProperties()

	return function(proto,key,descriptor){
		var  oldValue=descriptor.value;
		descriptor.value=function(){
			var  urlB='urlB';
			console.log('向'+urlB+'发送请求,数据:'+this.keyvalue);
			return oldValue.apply(this,arguments);
		}
	}
}
//修改类
function skin(target){
	target['属性名']='属性值';
}
var os=new Search();
oInput.oninput=function(){
	os.keyvalue=this.value; 
}
oBtn.onclick=function(){
	os.getContent(1,2);
}