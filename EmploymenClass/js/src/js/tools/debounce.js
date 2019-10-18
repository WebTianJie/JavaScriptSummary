function debounce(handle,delay){
	var timer=null;
	return function(){
		var _self=this,_arg=arguments;
		clearTimeout(timer);
		timer=setTimeout(function(){
			handle.apply(_self,_arg);
		},delay);
	}
}