function fn(){
	console.log('333');
}
function bindEvent(){
	var box=document.getElementsByClassName('box')[0];
	box.onclick=function(){
		console.log('555');
	}
}
bindEvent();