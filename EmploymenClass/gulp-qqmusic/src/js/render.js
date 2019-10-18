(function($,root){
	function renderImage(src){
		var img=new Image();
		img.src=src;
		img.onload=function(){
			$('.img-wrapper img').attr('src',src);
			root.blurImg(img,$('body'));
		}
	}
	function renderInfo(info){
			var str='<div class="song-name">'+info.song+'</div>'+
            '<div class="singer-name">'+info.singer+'</div>'+
            '<div class="album-name">'+info.album+'</div>';
			$('.song-info').html(str);
	}
	function renderIsLike(isLike){
		if(isLike){
			$('.like-btn').addClass('liking');
		}else{
			$('.like-btn').removeClass('liking')
		}
	}
	function renderTime(duration){
		$('.all-time').html((duration/60).toFixed(2));
	}
	root.render=function(data){
		renderImage(data.image);
		renderInfo(data);
		renderIsLike(data.isLike);
		renderTime(data.duration);
	}
		
}(window.Zepto,window.player||(window.player={})))
