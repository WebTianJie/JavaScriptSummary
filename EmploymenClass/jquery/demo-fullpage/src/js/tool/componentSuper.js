

function ComponentSuperFactory(config){
//	var $Div=$('<div class="component base" style="display:none;text-align:center;font-size:60px;"><span></span></div>');
	var $Div=$('<div class="component base"></div>');
	config.className&&$Div.addClass(config.className);
	config.width&&$Div.css('width',config.width);
	config.width&&$Div.css('height',config.height);
	config.text&&$Div.text(config.text);
	config.center&&$Div.css({position:'absolute',left:'50%',right:'50%',marginLeft:-config.width/2,marginRight:-config.height/2});
	config.css&&$Div.css(config.css);
	if(config.events){
		for(var  prop in config.events){
			$Div.on(prop,config.events[prop]);
		}
	}
	$Div.on('cpLeave',function(){
//		$(this).fadeOut();
		var self=$(this);
		config.delay&&setTimeout(function(){
			config.animateOut&&$(self).animate(config.animateOut);
		},config.delay||0);
	});
	$Div.on('cpLoad',function(){
		//$(this).fadeIn();
		var self=$(this);
		config.delay&&setTimeout(function(){
			config.animateIn&&$(self).animate(config.animateIn);
		},config.delay||0);
	});
	return $Div;
}
