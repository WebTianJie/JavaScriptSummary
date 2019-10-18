//var  config={
//	type:'base',
//	className:'duyi',
//	width:522,
//	height:336,
//	text:'这样做有什么好处呢?',
//	center:true,
//	css:{
//		position:'absolue',
//		opacity:0,
//		top:0,
//		backgroundImage:'url(src/images/bg.jpg)',
//		backgroundSize:'100% 100%',
//		padding:'10px 15px 10px 15px',
//		textAlign:'justfy',
//		fontSize:'18px',
//		fontWeight:'bold',
//		lineHeight:'25px'
//	},
//	animateIn:{
//		opacity:1,
//		top:240
//	},
//	animateOut:{
//		opacity:0,
//		top:0
//	},
//	delay:1000,
//	events:{
//		click:function(){
//			
//		},
//		mouseenter:function(){
//			
//		}
//		,
//		mouseout:function(){
//			
//		}
//	}
//}

function ComponentFactory(config){
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
$('.section').each(function(index,ele){
	$(ele).append(ComponentFactory(config));
});
$('.section').on('_leave',function(){
	$(this).find('.component').trigger('cpLeave');
});
$('.section').on('_load',function(){
	$(this).find('.component').trigger('cpLoad');
});
