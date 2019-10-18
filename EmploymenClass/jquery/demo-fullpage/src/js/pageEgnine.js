var pageEngine={
	init:function(selector,colorsArray){
		this.$W=$(selector);
		this.colorsArray=colorsArray;
		this.slideFlag=false;
		return this;
	},
	addSection:function(className){
		this.slideFlag=false;
		this.$Page=$('<div class="section"/>').addClass(className);
		this.$Page.appendTo(this.$W);
		return this;
	},
	addSlide:function(className){
		this.slideFlag=true;
		this.$Slide=$('<div class="slide">/').addClass(className).css('position','relative');
		this.$Slide.appendTo(this.$Page);
		return this;
	},
	addComponent:function(config){
		var oCp=null;
		switch (config.type){
			case 'base':
			oCp=ComponentFactory(config);
			break;
		case 'super':
		    oCp=ComponentSuperFactory(config);
		    break;
		}
		 this.slideFlag?this.$Slide.append(oCp):this.$Page.append(oCp);
		return this;    
	},
	bindEvent:function(){
		$(this).find('.section').on({
			_leave:function(){
				$(this).find('.component').trigger('cpLeave');
			},
			_load:function(){
				$(this).find('.component').trigger('cpLoad');
			}
		})
	},
	load:function(){
		var self=this;
		this.bindEvent();
		this.$W.fullPage({
			colorsArray:this.colorsArray,
			onLeave:function(index){
				self.$W.find('.section').eq(index).trigger('_leave');
			},
			afterLoad:function(index){
				self.$W.find('.section').eq(index).trigger('_load');
			}
		})
		this.$W.find('.section').eq(0).trigger('_load');
	}
}
