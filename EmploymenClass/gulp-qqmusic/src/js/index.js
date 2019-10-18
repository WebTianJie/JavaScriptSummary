var root=window.player;
var currIndex=0;
var dataList;
var len;
var audioControl=root.getAudio;
var timer;
function getData(url){
	$.ajax({
		type:"get",
		url:url,
		async:false,
		success:function(data){
			len=data.length;
			dataList=data;
			root.render(data[0]);
			audioControl.getAudio(data[0].audio);
			bindEvent();
		},
		error:function(){
			
		}
	});
}

function bindEvent(){
	$('body').on('change',function(e,index){
		root.render(dataList[Math.abs(index)%len]);
		audioControl.getAudio(dataList[Math.abs(index)%len].audio);
		if(audioControl.status=='play'){
			audioControl.play();
			routed(0);			
		}
		$('.img-wrapper img').attr('data-deg',0);
		$('.img-wrapper img').prop('style','');
	})
	//上一首
	$('.prev-btn').on('click',function(){
		$('body').trigger('change',--currIndex)
	})
	//下一首
	$('.next-btn').on('click',function(){
		$('body').trigger('change',++currIndex)
	})
	//播放
	$('.play-btn').on('click',function(){
		if(audioControl.status=='pause'){
			audioControl.play();
			var deg=parseInt($('.img-wrapper img').attr('data-deg'));
			routed(deg);
		}else{
			audioControl.pause();
			clearInterval(timer);
		}
		$(this).toggleClass('playing');
	})
	//添加关心
	$('.like-btn').on('click',function(){
		$(this).toggleClass('liking');
	})
}

function routed(deg){
	clearInterval(timer);
	deg=parseInt(deg);
	timer=setInterval(function(){
		deg+=2;
		$('.img-wrapper img').css({'transform':'rotateZ('+deg+'deg)','transmition':'1s ease-in'}).attr('data-deg',deg);
	},200)
}

getData('../mock/data.json')