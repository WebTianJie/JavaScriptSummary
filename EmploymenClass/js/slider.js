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
//			console.log(attrObj[attr],iCurr);
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