(function($,root){
	function Control(len){
		this.index=0;
		this.len=len;
	}
	Control.prototype={
		prev:function (){
//			if(this.index==0){
//				this.index=len-1;
//			}else{
//				this.index--;
//			}
			return this.getIndex(-1);
		},
		next:function (){
//			if(this.index==len-1){
//				this.index=0;
//			}else{
//				this.index++;
//			}
			return  this.getIndex(1);
		},
		getIndex:function(val){
			var index=this.index;
			var len=this.len;
			var currIndex=(index+val+len)%len;
			this.index=currIndex;
			console.log(currIndex);
			return currIndex;
		}
		
	}
//	root.controlIndex=new Control();
	root.controlIndex=Control;
})(window.Zepto,window.player||(window.player={}))
