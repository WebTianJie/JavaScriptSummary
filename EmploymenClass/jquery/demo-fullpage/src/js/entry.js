//$('.wrapper').fullPage({
//			colorArray:['red','blue','green'],
//			onLeave:function(index,dir){
//				//找到离开时的section
//				$('.section').eq(index).find('.component').trigger('_leave');
//			},
//			afterLoad:function(index,dir){
//				//进来的section
//				$('.section').eq(index).find('.component').trigger('_load');
//			}
//})
////生成section内容,只关注
pageEngine.init('.box',['green','red','black'])
			.addSection('oneSection')
				.addComponent({
					type:'base',
					className:'duyi',
					width:522,
					height:336,
					text:'这样做有什么好处呢?',
					center:true,
					css:{
						position:'absolue',
						opacity:1,
						top:0,
						backgroundImage:'url(src/images/bg.jpg)',
						backgroundSize:'100% 100%',
						padding:'10px 15px 10px 15px',
						textAlign:'justfy',
						fontSize:'18px',
						fontWeight:'bold',
						lineHeight:'25px'
					},
					animateIn:{
						opacity:1,
						top:240
					},
					animateOut:{
						opacity:0,
						top:0
					},
					delay:1000,
					events:{
						click:function(){
							
						},
						mouseenter:function(){
							
						}
						,
						mouseout:function(){
							
						}
					}
				})
			.addSection('twoSection')
				.addComponent({
					type:'base',
					className:'duyi',
					width:522,
					height:336,
					text:'这样做有什么好处呢?',
					center:true,
					css:{
						position:'absolue',
						opacity:1,
						top:0,
						backgroundImage:'url(src/images/bg.jpg)',
						backgroundSize:'100% 100%',
						padding:'10px 15px 10px 15px',
						textAlign:'justfy',
						fontSize:'18px',
						fontWeight:'bold',
						lineHeight:'25px'
					},
					animateIn:{
						opacity:1,
						top:240
					},
					animateOut:{
						opacity:0,
						top:0
					},
					delay:1000,
					events:{
						click:function(){
							
						},
						mouseenter:function(){
							
						}
						,
						mouseout:function(){
							
						}
					}
				})
			.addSection('threeSection')
				.addSlide('3-1-0')
				.addComponent({
					type:'base',
					className:'duyi',
					width:522,
					height:336,
					text:'这样做有什么好处呢?',
					center:true,
					css:{
						position:'absolue',
						opacity:1,
						top:0,
						backgroundImage:'url(src/images/bg.jpg)',
						backgroundSize:'100% 100%',
						padding:'10px 15px 10px 15px',
						textAlign:'justfy',
						fontSize:'18px',
						fontWeight:'bold',
						lineHeight:'25px'
					},
					animateIn:{
						opacity:1,
						top:240
					},
					animateOut:{
						opacity:0,
						top:0
					},
					delay:1000,
					events:{
						click:function(){
							
						},
						mouseenter:function(){
							
						}
						,
						mouseout:function(){
							
						}
					}
				})
				.addSlide('3-1-1')
					.addComponent({
						type:'base',
						className:'duyi',
						width:522,
						height:336,
						text:'这样做有什么好处呢?',
						center:true,
						css:{
							position:'absolue',
							opacity:1,
							top:0,
							backgroundImage:'url(src/images/bg.jpg)',
							backgroundSize:'100% 100%',
							padding:'10px 15px 10px 15px',
							textAlign:'justfy',
							fontSize:'18px',
							fontWeight:'bold',
							lineHeight:'25px'
						},
						animateIn:{
							opacity:1,
							top:240
						},
						animateOut:{
							opacity:0,
							top:0
						},
						delay:1000,
						events:{
							click:function(){
								
							},
							mouseenter:function(){
								
							}
							,
							mouseout:function(){
								
							}
						}
					})
				.addSlide('3-1-2')
					.addComponent({
						type:'base',
						className:'duyi',
						width:522,
						height:336,
						text:'这样做有什么好处呢?',
						center:true,
						css:{
							position:'absolue',
							opacity:1,
							top:0,
							backgroundImage:'url(src/images/bg.jpg)',
							backgroundSize:'100% 100%',
							padding:'10px 15px 10px 15px',
							textAlign:'justfy',
							fontSize:'18px',
							fontWeight:'bold',
							lineHeight:'25px'
						},
						animateIn:{
							opacity:1,
							top:240
						},
						animateOut:{
							opacity:0,
							top:0
						},
						delay:1000,
						events:{
							click:function(){
								
							},
							mouseenter:function(){
								
							}
							,
							mouseout:function(){
								
							}
						}
					}).load();
