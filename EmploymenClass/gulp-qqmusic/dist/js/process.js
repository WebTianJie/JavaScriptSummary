(function($,root){
	function Process(){
	}
	Process.prototype={
		click:function(targetTime){
			this.audio.currentTime=targetTime;
		}
	}
	root.process=Process;
}(window.Zepto,window.player||(window.player=={})))
