(function() {
	function JQuery(selector) {
		return new JQuery.prototype.init(selector);
	}
	JQuery.prototype.init = function(selector) {
		//选出dom对象,封装成jquery对象,返回
		//id,class
		this.length = 0;
		//null,undefined,dom
		if(selector == null) {
			return this;
		}
		if(typeof (selector) == "string" && selector.indexOf('.') != -1) {
			var dom = document.getElementsByClassName(selector.slice(1))
		} else if(typeof (selector) == "string" && selector.indexOf('#') != -1) {
			var dom = document.getElementById(selector.slice(1));
		} else {

		}
		//基础
		if(selector instanceof Element || dom.length == undefined) {
			this[0] = dom || selector;
			this.length++;
		} else {
			for(var i = 0; i < dom.length; i++) {
				this[i] = dom[i];
				this.length++;
			}
		}
		// 		return this;
	}
	JQuery.prototype.css = function(config) {
		//循环操作
		for(var i = 0; i < this.length; i++) {
			for(var attr in config) {
				this[i].style[attr] = config[attr];
			}
		}
		//链式操作
		return this;
	}
	JQuery.prototype.pushStack=function(dom){
		if(dom.constructor!=JQuery){
			dom=JQuery(dom);
		}
		dom.prevObject=this;
		return dom;
	}
	JQuery.prototype.get = function(num) {
		if(num == null) {
			Array.prototype.slice.call(this, 0);
		} else {
			if(num > 0) {
				return this[num]
			} else {
				return this[num + this.length]
			}
		}
		return num != null ? (num >= 0?this[num]: this[num + this.length]) : [].slice.call(this, 0);
	}
	JQuery.prototype.myeq = function(num) {
		var dom = num != null ? (num >= 0 ? this[num] : this[num + this.length]) : null;
		return this.pushStack(dom);
	}
	JQuery.prototype.find=function(label){
		
	}
	JQuery.prototype.add=function(selector){
		var currObj=JQuery(selector);
		var thisObj=this;
		var newObj=JQuery();
		for(var i=0;i<currObj.length;i++){
			newObj[newObj.length++]=currObj[i];
		}
		for(var i=0;i<thisObj.length;i++){
			newObj[newObj.length++]=thisObj[i];
		}
		this.pushStack(newObj);
		return newObj;
	}
	JQuery.prototype.end=function(){
		return this.prevObject;
	}
	JQuery.prototype.myon=function(type,handle){
		for(var i=0;i<this.length;i++){
			if(!this[i].cacheEvent){
				this[i].cacheEvent={};
			}
			if(!this[i].cacheEvent[type]){
				this[i].cacheEvent[type]=[handle];
			}else{
				this[i].cacheEvent[type].push(handel);
			}
		}
	}
	JQuery.prototype.mytrigger=function(type){
		var params=arguments.length>1?[].slice.call(arguments,1):[];
		var self=this;
		for(var i=0;i<this.length;i++){
			if(this[i].cacheEvent[type]){
				this[i].cacheEvent[type].forEach(function(ele,index){
					ele.apply(self,params);
				})
			}
		}
	}
	JQuery.prototype.myqueue=function(){
		var queueObj=this;
		var queueName=arguments[0]||'fx';
		var addFunc=arguments[1]||null;
		var len=arguments.length;
		if(len==1){
			return queueObj[0][queueName];
		}
		queueObj[0][queueName]==undefined?queueObj[0][queueName]=[addFunc]:queueObj[0][queueName].push(addFunc);
		return this;
	}
	JQuery.prototype.mydequeue=function(type){
		var self=this;
		var queueName=arguments[0]||'fx';
		var queArr=this.myqueue(queueName);
		var currFunc=queArr.shift();
		if(currFunc==undefined){
			return;
		}
		var next=function(){
			self.mydequeue(queueName);
		}
		currFunc(next);
		return this;
	}
	JQuery.prototype.mydelay=function(duration){
		var  queuearr=this[0]['fx'];
		queuearr.push(function(next){
			setTimeout(function(){
				next();
			},duration);
		})
		return this;
	}
	JQuery.prototype.myanimate=function(json,callback){
		var len=this.length;
		var self=this;
		var baseFunc=function(next){ 
			var times=0;
			for(var i=0;i<len;i++){
				bufferMove(self[i],json,function(){
					times++;
					if(times==len){
						callback&&callback();
						next();
					}
				})
			}
		}
		this.myqueue('fx',baseFunc);
		if(this.myqueue('fx').length==1){
			this.mydequeue('fx');
		}
		
		
		
		function getStyle(oDom,attr){
			if(window.getComputedStyle){
				return window.getComputedStyle(oDom,null)[attr];
			}else{
				return oDom.currentStyle[attr];
			}
		}
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
		return  this;
	}
	JQuery.myCallBacks=function(){
		//once,memory,uniquire
		//存储参数
		var options=arguments[0]||'';
		//存储方法
		var list=[];
		//当前执行函数的索引
		var fireIndex=0;
		//记录是否被fire过
		var fired=false;
		//实际参数列表
		var args=[];
		var  fire=function(){
			for(;fireIndex<list.length;fireIndex++){
				list[fireIndex].apply(window,args);
			}
			if(options.indexOf('once')!=-1){
				list=[];
				fireIndex=0;
			}
		}
		return {
			add:function(func){
				list.push(func);
				if(options.indexOf('memory')!=-1&&fired){
					fire();
				}
				return this;
			},
			fire:function(){
				fireIndex=0;
				args=arguments;
				fired=true;
				fire();
			}
		}
	}
	JQuery.myDefered=function(){
		//callbacks,
		//3个callbacks,
		//done,resolve,fail reject,progress notify
		var arrCallBacks=[
			[JQuery.myCallBacks('once memory'),'done','resolve'],
			[JQuery.myCallBacks('once memory'),'file','reject'],
			[JQuery.myCallBacks('memory'),'progress','notify']
		];
		var pedding=true;
		var defered={};
		for(var i=0;i++;i<arrCallBacks.length;i++){
			//defered['done']=function(){}
			//defered['file']=function(){}
			//defered['proress']=function(){}
			defered[arrCallBacks[i][1]]=(function(index){
				return function(func){
					arrCallBacks[index][0].add(func);
				}
			})(i)
			//defered['resolve']=function(){}
			//defered['reject']=function(){}
			//defered['notify']=function(){}
			defered[arrCallBacks[i][2]]=(function(index){
				return function(){
					var args=arguments;
					if(pedding){
						arrCallBacks[index][0].fire().apply(window,args);
						arrCallBacks[index][2]='resolve'||arrCallBacks[index][2]=='reject'?pedding=false:'';
					}
				}
			})(i)
		}
		return defered;
	}
	JQuery.prototype.init.prototype = JQuery.prototype;
	window.$ = window.JQuery = JQuery;
})()