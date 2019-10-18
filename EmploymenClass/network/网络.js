1:网络请求
  1:三次握手协议 建立连接 
  2:四次握手协议 关闭连接
2:协议:
   1:https:默认请求的是443接口
   2:http:默认访问算口80
3:浏览器同源策略
	1:同源:协议相同,域名(ip相同),端口相同
4:解决跨域与请求
   1:flash,iframe
   2:服务器中间代理
   3:jsonp
   	原理:sr不受同源策略的影响 
   //服务器端
      getData({
      	"name":'刘明',
      	"age":18
      });
   //浏览器端js
    function getData(data){
    	console.log(data);
    }
    //请求数据的时候getName.php?cb="getData"
   4:document.domain(主域名相同的情况下才可以使用)
5:cookie的安全机制
	1:有服务器生成,发供给浏览器端有浏览器保存到的本地文件中,
	2:在本地文件设置cookie,(谷歌流浪器是无效的,其他的浏览器是有效的),在服务器(google)下设置设有效的
6:iframe框架巧妙解决跨域问题

  1:当前页面获取iframe子页面的内容
	  document.getElementById('iframeId').onload=function(){
	  	document.getElementById('iframeId').contentWindow.age;
	  	window.frames['iframe的name']
	  }
  2:子页面获取父页面内容
    window.parent.name
  3:window.top;顶级的窗体
    ie:
      1:document.iframes['name'].contentWindow;
      2:document.iframes[i].contentWindow;
	4:iframe状态判断
	  1:ie onload
	  2:onreadystatechange
	5:iframe跨域
	 1:借助哈希值来进行跨域,子页面在任何情况下都能取得哈希值(url连接总锚点的值)
	 		当前iframe的src值添加一个#和传递参数
	 		src=src+'#'+'code001';
	 	2:window.name,是值存在的iframe的窗口上面的name属性,只要iframe没有删除
	 	都可以取到name
	 	  var iframe=document.getElementById('iframeId');
	 	  var flag=true;
	 	  iframe.onload=function(){
	 	  	if(flag){
	 	  		iframe.src="换成同源的地址";
	 	  		iframe.contentWindow.name;
	 	  		flag=false;
	 	  	}else{
	 	  		console.log(iframe.contentWindow.name);
	 	  	}
	 	  }
	 	  
