var data=[
	 {title:'故宫网站崩了',lasts:'787946',currs:'787996'},
	  {title:'小米组织调整',lasts:'787946',currs:'787916'},
	  {title:'人人车回应破产',lasts:'787946',currs:'787936'},
	  {title:'故宫网站崩了',lasts:'787916',currs:'787926'},
	  {title:'富兰克林被停赛',lasts:'787956',currs:'787966'},
	  {title:'故宫网站崩了',lasts:'787946',currs:'787996'},
	  {title:'郑嘉颖首秀儿子',lasts:'787946',currs:'787916'},
	  {title:'见义勇为反被狗咬',lasts:'787946',currs:'787936'},
	  {title:'榆树发生地震',lasts:'787916',currs:'787926'},
	  {title:'短袖哥勇救男童',lasts:'787956',currs:'787966'},
	  {title:'故宫再次晚间开放',lasts:'787946',currs:'787996'},
	  {title:'高密周凯结婚',lasts:'787946',currs:'787916'},
	  {title:'视航科技滑出跑道',lasts:'787946',currs:'787936'},
	  {title:'印度高铁故障',lasts:'787916',currs:'787926'},
	  {title:'陈涵产后首照',lasts:'787956',currs:'787966'},
	  {title:'尼日利亚大选推迟',lasts:'787946',currs:'787996'},
	  {title:'埃及金字塔有旅游',lasts:'787946',currs:'787916'},
	  {title:'日月潭污水',lasts:'787946',currs:'787936'},
	  {title:'百慕大航班失恋',lasts:'787916',currs:'787926'},
	  {title:'新的流感疾病爆发',lasts:'787956',currs:'787966'},
	  {title:'猪肉价格涨了',lasts:'787946',currs:'787996'},
	  {title:'新能源腾讯',lasts:'787946',currs:'787916'},
	  {title:'人工智能和区块链',lasts:'787946',currs:'787936'},
	  {title:'新疆油田工程',lasts:'787916',currs:'787926'},
	  {title:'范丞丞荧幕首现',lasts:'787956',currs:'787966'},
	  {title:'天眼获得最新的宇宙消息',lasts:'787946',currs:'787996'},
	  {title:'霍金的三个预言',lasts:'787946',currs:'787916'},
	  {title:'玛雅文明的失落',lasts:'787946',currs:'787936'},
	  {title:'机器人深蓝的现况',lasts:'787916',currs:'787926'},
	  {title:'互联网大会在杭州召开',lasts:'787956',currs:'787966'},
	  {title:'天网系统的最新消息',lasts:'787946',currs:'787996'},
	  {title:'人类最有可能迁居的星球',lasts:'787946',currs:'787916'},
	  {title:'科学家发现了细菌中的长寿秘密',lasts:'787946',currs:'787936'},
	  {title:'镜门事件湖北',lasts:'787916',currs:'787926'},
	  {title:'郑州新的高铁的规划',lasts:'787956',currs:'787966'},
	  {title:'关注未来科技',lasts:'787916',currs:'787926'},
	  {title:'最新影院大咖',lasts:'787956',currs:'787966'}
	 ];
	(function (data){
		var  wrapObj=$('.wrap');
		var  ulObj=wrapObj.find('ul');
		var  tpl=ulObj.find('.tpl');
		var  currPage=0;
		var  pageSize=Math.ceil(data.length/10);
		var colorArray=['#f54545','#ff8547','#ffac38'];
		ulObj.hide();
		function bindEvent(){
			wrapObj.find('.change').on('click',function(){
				ulObj.hide();
				currPage=++currPage%pageSize;
				renderPage(data);
				ulObj.fadeIn();
				
			})
		}
		function renderPage(data){
			ulObj.fadeIn();
			ulObj.find('.item').remove();
			var  len=data.length-currPage*10>10?10:data.length-currPage*10;
			for(var  i=0;i<len;i++){
				var item=data[i+currPage*10];
				var liObj=tpl.clone().removeClass('tpl').addClass('item');
				liObj.find('span').eq(0).text(i+currPage*10+1).css('background',currPage==0&&colorArray[i])
					.next().text(item.title)
					.next().addClass(item.currs-item.lasts>0?'up':'down');
				ulObj.append(liObj);	
			}
		}
		renderPage(data);
		bindEvent();
	}(data))