var personArr=[
			{name:'王玲',src:'src/images/1.jpg',des:'很好55',sex:'m',age:18},
			{name:'刘东',src:'src/images/2.jpg',des:'很好44',sex:'f',age:16},
			{name:'李晗',src:'src/images/3.jpg',des:'很好33',sex:'m',age:13},
			{name:'张天星',src:'src/images/4.jpg',des:'很好22',sex:'f',age:12},
			{name:'张天行',src:'src/images/4.jpg',des:'很好44',sex:'m',age:12},
			{name:'陈楠',src:'src/images/5.jpg',des:'很好11',sex:'m',age:19}
];
var oUl=document.getElementsByTagName('ul')[0];
var oInput=document.getElementsByClassName('sText')[0];
//var  state={
//	text:'',
//	sex:''
//}
store.subscribe(function(){
	//更新页面||更新试图
	RenderPage(lastFilterArr(personArr));
})
//数据渲染
function RenderPage(data){
	//遍历
	var str='';
	data.forEach(function(ele,index,self){
		str+='<li><img src="'+ele.src+'"/><p class="name">'+ele.name+'</p><p class="des">'+ele.des+'</p></li>';
	})
	oUl.innerHTML=str;
}
RenderPage(personArr);
oInput.oninput=debounce(function(){
   	store.dispatch({type:'text',value:this.value});
},200)
//oInput.oninput=function(){
//	console.log(this.value);
// 	store.dispatch({type:'text',value:this.value});
//}

// btn样式切换
var oBtnArr=Array.prototype.slice.call(document.getElementsByClassName('btn'),0);
var lastActiveBtn=oBtnArr[2];
oBtnArr.forEach(function(ele,index,self){
	ele.onclick=function(){
		changeActive(this);
		store.dispatch({type:'sex',value:this.getAttribute('sex')});
//		RenderPage(lastFilterArr(personArr));
	}
})
function changeActive(currActiveBtn){
	currActiveBtn.className="btn active";
	lastActiveBtn.className="btn";
	lastActiveBtn=currActiveBtn;
};

