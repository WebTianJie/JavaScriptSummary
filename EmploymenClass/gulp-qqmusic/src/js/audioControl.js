(function($,root){
	function ManagerAudio(){
		 this.audio=new Audio();
//		audio.src=src;
		this.status='pause';
	}
	ManagerAudio.prototype={
		play:function (){
			this.audio.play();
			this.status='play';
		},
		pause:function (){
			this.audio.pause();
			this.status='pause';
		},
		getAudio:function (src){
			this.audio.src=src;
			this.audio.load();
		}
	}
	root.getAudio=new ManagerAudio();
	
}(window.Zepto,window.player||(window.player={})))
