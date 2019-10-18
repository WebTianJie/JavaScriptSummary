//实现页面渲染,图片,info,like
(function($,root){
	
	function renderImg(src){
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
	function renderLike(isLike){
		if(isLike){
			$('.like-btn').addClass('liking');
		}else{
			$('.like-btn').removeClass('liking')
		}
	}
	root.render=function(data){
		console.log(data);
		renderImg(data.image);
		renderInfo(data);
		renderLike(data.isLike)
	}
})(window.Zepto,window.player||(window.player={}))

