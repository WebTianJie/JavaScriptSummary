function move(dom,distance){
	var speed=0;
	var u=0.8;
	dom.timer=setInterval(function(){
		var  left=dom.offsetLeft;
		speed=(distance-left)/10;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		if(Math.abs(distance-left)<=Math.abs(speed)){
			clearInterval(dom.timer);
			dom.style.left=distance+'px';
		}else{
			dom.style.left =left+ speed + 'px';
		}
		
	},30);
}
function getStyle(ele,prop){
	if(window.getComputedStyle){
		return window.getComputedStyle(ele,null)[prop];
	}else{
		return ele.currentStyle[prop];
	}
}