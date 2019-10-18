(function($,root){
	function IndexControl(len){
		this.index=0;
		this.len=len;
	}
	IndexControl.prototype.prev=function(){
		this.index--;
		return Math.abs(index)%len;
	}
	IndexControl.prototype.next=function(){
		this.index++;
		return Math.abs(this.index)/len;
	}
	root.indexControl=IndexControl;
}(window.Zepto,window.player||(window.player={})))
