(function($,root){
	function IndexControl(len){
		this.index=0;
		this.len=len;
	}
	IndexControl.prototype={
		prev:function(){
		   return this.getIndex(-1);
		},
		next:function(){
			return this.getIndex(1);
		},
		getIndex:function(val){
			var  currIndex=val>0?++this.index:++this.index;
			return Math.abs(currIndex)%this.len;
		}
	}
	root.indexControl=IndexControl;
}(window.Zepto,window.player||(window.player={})))
