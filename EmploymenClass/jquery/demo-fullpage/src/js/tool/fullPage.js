$.fn.extend({
	fullPage:function(config){
		//config.colorArray
		//初始化变量
		var  colorsArray=config.colorsArray;
		var  $Wrapper=$(this);
		var  $Section=$Wrapper.find('.section');
		var  clientWidth=$(window).outerWidth();
		var  clientHeight=$(window).outerHeight();
		var  currIndex=0;
		var	 lock=true;
		var  commonStyle={
			width:'100%',
			height:'100%'
		}
		//初始化样式
		$('html')
			.add('body')
				.css({position:'relative',overflow:'hidden',margin:'0'})
				.add($Wrapper)
					.add($Section)
						.css(commonStyle);
		$Wrapper.css({position:'absolute',left:0,top:0})
			.find('.section')
				.each(function(index,ele){
					$(ele).css({backgroundColor:colorsArray[index],position:'relative'})
						.find('.slide').css({float:'left',width:clientWidth,height:clientHeight})
							.wrapAll('<div class="slideWrapper"></div>');
				});
		$Section.find('.slideWrapper').each(function(index,ele){
			$(ele).css({position:'absolute',width:$(ele).find('.slide').size()*clientWidth,height:clientHeight});
		});
		//js控制移动
		//active
		//给第一个section,active
		//给每一个section下面的slide innerActive
		//类名初始化
		$Section.eq(0).addClass('active')
			.end().find('.slideWrapper').each(function(index,ele){
				$(ele).find('.slide').eq(0).addClass('innerActive')
			});
		//控制移动
		$(document).on('keydown',function(e){
			//e.which
			//left 37,top 38, right 39,bottom 40 键盘上面的上下左右
			if(e.which==38||e.which==40){
				//垂直移动$Wrapper
				if(lock){
					lock=false;
					var  newTop=$Wrapper.offset().top;
					var  dir='';
					if(e.which==38&&currIndex!=0){
						//top
						dir='top';
						config.onLeave(currIndex,dir);
						currIndex--;
						newTop+=clientHeight;
					}else if(e.which==40&&currIndex!=$Section.size()-1){
						//bottom
						dir='bottom';
						config.onLeave(currIndex,dir);
						currIndex++;
						newTop-=clientHeight;
					}
					$Wrapper.animate({top:newTop},350,'swing',function(){
						lock=true;
//						$Section.eq(currIndex).addClass('active');
//						if(dir=='top'){
//							$Section.eq(currIndex+1).removeClass('active');
//						}else{
//							$Section.eq(currIndex-1).removeClass('active');
//						}
						$Section.eq(currIndex).addClass('active').siblings('.section').removeClass('active');
						config.afterLoad(currIndex,dir);
					})
				}
			}
			if(e.which==37||e.which==39){
				if(lock&&$('.active').find('.slideWrapper').length>0){
					//水平移动.slideWrapper
					lock=false;
					var $sw=$('.active').find('.slideWrapper');
					var currDom=$sw.find('.innerActive');
					var newWidth=$sw.offset().left;
					var dir=null;
					if(e.which==37&&currDom.index()!=0){
						//left
						newWidth+=clientWidth;
						dir='left'
					}else if(e.which==39&&currDom.index()!=$sw.find('.slide').size()-1){
						//right
						newWidth-=clientWidth;
						dir='right';
					}
					$sw.animate({left:newWidth},350,'swing',function(){
						lock=true;
						dir!=null?currDom.removeClass('innerActive'):'';
						if(dir=='left'){
							currDom.prev().addClass('innerActive')
						}else if(dir=='right'){
							currDom.next().addClass('innerActive')
						}
					})
				}
				
			}
		})
	}
})
