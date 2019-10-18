var root=window.player;
var dataList;
var len;
var audio=root.audioManager;
var controlIndex;
var timer;
function getData(url){
	$.ajax({
		type:'get',
		url:url,
		success:function(data){
			dataList=data;
			len=data.length;
			controlIndex=new root.controlIndex(len);
			root.render(data[0]);
			audio.getAudio(data[0].audio);
			bindEvent();
		},
		error:function(){
			
		}
	});
}
function bindEvent(){
	$('body').on('play:change',function(e,index){
		audio.getAudio(dataList[index].audio);
		root.render(dataList[index]);
		if(audio.status=="play"){
			audio.play();
			routed(0);
		}
		$('.img-wrapper img').attr('data-deg',0);
		$('.img-wrapper img').css({'transform':'none'});
	})
	$('.prev-btn').on('click',function(){
		var nowIndex=controlIndex.prev();
		$('body').trigger('play:change',nowIndex);
		routed(0);
	})
	$('.next-btn').on('click',function(){
		var nowIndex=controlIndex.next();
		$('body').trigger('play:change',nowIndex);
		routed(0);
//		audio.getAudio(dataList[nowIndex].audio);
//		root.render(dataList[nowIndex])
//		if(audio.status=="play"){
//			audio.play();
//		}
	})
	$('.play-btn').on('click',function(){
		if(audio.status=="pause"){
			audio.play();
			var deg=$('.img-wrapper img').attr('data-deg');
			routed(deg);
		}else{
			audio.pause();
			clearInterval(timer);
		}
		$(this).toggleClass('playing');
	});
}
function routed(deg){
	clearInterval(timer);
	deg=parseInt(deg);
//	var  deg=0;
	timer=setInterval(function(){
		deg+=2;
		$('.img-wrapper img').attr('data-deg',deg);
		$('.img-wrapper img').css({'transform':'rotateZ('+deg+'deg)','transition':'all 1s ease-in'});
	},200)
}
getData('../mock/data.json');
//信息加图片,渲染到页面上
//点击按钮
//音频的播放和暂停,切换
//进度条运动和拖拽
//图片旋转
//歌曲列表
