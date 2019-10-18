## 安装流程
```
1:cpu虚拟化开启
  1:开启启动进入bos,
  2:VT-X或者Virtual Techonlogy 开启cpu虚拟化
2:打开VirTuialBox 设置服务器为linux ,other linux64位
3:安装完成以后 点击设置
4:存储->分配光驱 选择你下载centos服务器镜像文件(.ison)
5:设置->网络->桥接网卡(不设置的话,容易导致断网)
6:点击启动 开始安装虚拟机
```
## 常见命令
```
设置虚拟机的ip
1:cd /etc
2:cd sysconfig/
3:cd network-scripts/
4: ll 列出所有文件
5:vi ifcfg-enp0s3 按下Enter打开文件   打开页面按下 i 编辑文件
6:修改ONBOOT=yes 按下ESC ,按下:冒号 进入命令编辑模式
7:按下wq(w写入,q退出) 回车
8:重启 reboot
```
## 安装wget
```
  1:yum install wget(从中央仓库安装wget)
  2: wget (https://nodejs.org/dist/v10.16.0/node-v10.16.0-linux-x64.tar.xz) 安装nodejs
  3:ll查看文件信息 ls只看文件的名字
  4:xz -d node-v10.16.0-linux-x64.tar.xz 解压文件xz文件
  5:tar -xf node-v10.16.0-linux-x64.tar 解压tar文件
  6:cd ~ 回到上次目录 cd .. 回到上级目录
  7:软连接node node在当前文件下面的bin文件家里面,超了解到/usr/bin/文件夹下
	ln -s ~/node-v10.16.0-linux-x64/bin/node /usr/bin/node 空格不能少
  8:软连接npm
	ln -s ~/node-v10.16.0-linux-x64/bin/npm /usr/bin/npm
  8:.exit 退出node
  9:FHS协议
	File System Hierarchy Srandard 文件系统层次化标准
```
## linux的基本命令操作
###   linux文件解读
	1:/usr UNIX SoftWare Resource
	2:/bin 该目录下所有的文件都是可执行的
	3:/var 系统资源 不用管
	4:/boot 开机相关设置 不用管
	5:/dev 机器上所有的设备,没添加一个设备,会多一个文件
	6:/etc 存放配置文件的文件夹,账号,密码,网路等配置文件
	7:/home 用户目录(除了root以外的用户都在这个文件里面),root在根目录下
	8:~ 当前用户的根目录
	9:/lib linux下面的函数库
	10:/media 存放一些可以删除的设备
	11:/mnt 和media基本上一直
	12:/opt 存放第三方的的软件,安装的第三方的软件的目录
	13:/sbin 只允许系统管理员有权限的访问的程序
	14:/srv 存放用户主动生成出来数据
	15:/tmp 临时文件
	16:/proc 虚拟文件系统 不存在硬盘,存放在内存,重启开机,会丢失,存放一些系统相关的文件
	17:/found 当系统发生错误的时候,一些文档碎片会放在这里,便于灰度
### linux常用的命令行操作
    1:cd 进入某个目录 后面跟随路径
	2:cd .. 回到上一级目录
	3:cd ~ 回到当前主文件夹
	4:ls 当前目录
	5:ls-l 文件详情 缩写 ll
	6:ls-al 可以看到隐藏文件 .开的头的文件
	7:mkdir filename 创建一个文件夹,只能创建一个文件夹
	8:mkdir filename/filename可以一次按照顺序创建多个文件夹
	9:rmdir 删除文件夹 只能删除空文件夹
	10:rm -rf 删除文件夹和里面的所有的文件
	11:- - - -  文件权限
	   第一个中字符: 路径还是文件 (D标识路径,-标识文件)
	   分三组,每个组三个字符
	   第一组:当前用户的权限
	   第二组:当前用户所属组的权限
	   第三组:其他用户组的权限
	   r 读权限 w 写权限 x执行权限
	   r-- 只读
	   rw- 读写
	   rwx 读写和执行
	12:创建文件加权限 这是第一组的权限
		r  w  x
		读 写 执行
		4   2  1
	   mkdir -m 123 text  用户可以执行,当前用户组可以写入,其他用户组可以执行和写
	   mkdir -m 4 text 可读
	   mkdir -m 2 text 可写
	   mkdir -m 1 text 可执行
	   mkdir -m 3 text 可执行,可以写 数字相加
	   mkdir -m 7 text 可执行,可以写,可以执行, 数字相加
	   mkdir -m 777 text 当前用户,当前用户组的权限,其他用户组的权限都是可读可写可执行
	13:pwd 当前路径在绝对路径下面的是怎样的
	14:vi a.txt 创建一个文件(文件存在的话,就是打开,按下i,进入编辑状态),:冒号是保存,:wq保存退出,:q!强制退出
	15:Ctrl+f向下翻页,Ctrl+b向上翻页,Ctrl+u 向上翻半页 ,Ctrl+ d:向下移动半页
	16:+ 光标移动到下一个非空格行,-相反
	17:空格向右移动,0回到行首,$回到行尾,shift+G:移动到文件的最后一行,gg回到第一行,N+G:移动到第N行
	18:/jk 文件中第一个jk字符 ?jk向上查找第一个字符jk
	19:tail a.txt 显示文件的最后十行 
	20:tail -f a.txt 显示文件的最十行 a.txt文件被修改的话,可以实时看到, tail -20f a.txt 显示前20行
	21:cat a.txt |grep "yu" 找出文件中带有"yu"的行 cat的可以换成tail
	22:cat a.txt |grep "yu" | "l" 带有 yu和l字符的
			
			|grep "code" 是一个限制命令,可以和很多命令一起组合使用 ll !grep 'node' 找出带node的文件
			
	23:chmod 777 b.sh 添加权限,777添加所有的权限
	24:ssh 用户名@ip :连接远程的虚拟机
	25:查看用户组:  cd etc/home/  cat /etc/group  
	26:useradd name 增加用户,只能加用户的同时会创建一个同名的用户组
	27:groupadd 增加用户组
	28:useradd -G groupname username 向某个用户里面添加用户
	29:groupdel groupname 删除用户组
	30:userdel username 删除用户
	21:groups username 查看用书属于哪个组
	22:whoami 查看自己的用户
	23:usermod -g groupname username 修改用户的组别
	24:id username 查看用户的详细信息
	25:su username 切换用户,从一个用户,换成另外一个用户 ,exit 退出到root用户
	25:lscpu 查看cpu的类型
	26:df 查看磁盘的空间
	27:df -i 查看索引空间
	28:ps aux 查看所有的服务
	29:top 机器资源占用情况
	30:systemctl disable firewalld 关闭防火墙 (node服务器搭建的服务无法访问,关闭防火墙,重启)
	31:curl(curl需要安装)
		curl www.baidu.com 会返回百度首页的html内容
		curl -i wwww.baidu.com 返回http的协议头和内容
## http协议
	五层网路协议,七层网路协议
	五层网络协议:
		1:应用层,浏览器(http协议),qq,微信,网站 应用层的协议是自己定的,
		2:传输层,作用域交换机上,tcp协议(只发送,关注结果),udp协议(只发送,不关注结果)
		3:网络层,ip协议
		4:数据链路层: 如何传输 ptm,fddi(搭乘什么交通工具)
		5:物理层:电流,编码,频率,OSI的物理层规范搭乘工具的时候,是什么速度)
		状态码
		200:收到发送得消息
		404:没找到
		302:页面重定向
		304:本地有缓存,让浏览器自己取缓存
		502:服务器内部错误
	七层网路协议:
		1:应用层:浏览器(http协议),qq,微信,网站 应用层的协议是自己定的,ftp,dns,smtp,telnet
		2:表示层:加密,格式转换
		3:会话层:建立或者解除和其它节点的来联系
		4:传输层,作用域交换机上,tcp协议(只发送,关注结果),udp协议(只发送,不关注结果)
		5:网络层,ip协议,BGP,ICMP,RIP
		6:数据链路层: 如何传输 ptm,fddi(搭乘什么交通工具)
		7:物理层:电流,编码,频率,iso的物理层规范搭乘工具的时候,是什么速度)
		
		Request请求
			请求头:
				HTTP/1.1 200 OK
				Accept-Ranges: bytes
				Cache-Control: private, no-cache, no-store, proxy-revalidate, no-transform 
					private:可以缓存,只能被一个服务器缓存,单利服务器不能缓存 
					pulic:可以被总监曾缓存,包括服务器和代理服务器
					no-cache: 不要相信缓存,使用前个服务器验证
					only-if-cached:只要有缓存,就不请求服务器
					max-age:最大缓存事件
					max-state:表示客户端愿意接受一个过期的资源,但是响应不能超过设置时间
					min-fresh:表示客户端希望在指定的时间内获得最新响应
					Must-revalidate:使用缓存前,验证资源状态,如果资源过期则不能使用
					Proxy-revallidate:和上面作用相同,适用于共享缓存,(比如代理服务器)
					No-store:不使用缓存
					No-transform:不许对缓存资源进行装换或转码
				Connection: Keep-Alive
				Content-Length: 2381
				Content-Type: text/html
				Date: Thu, 04 Jul 2019 09:13:40 GMT
				Etag: "588604c8-94d"
				Last-Modified: Mon, 23 Jan 2017 13:27:36 GMT
				Pragma: no-cache
				Server: bfe/1.0.8.18
				Set-Cookie: BDORZ=27315; max-age=86400; domain=.baidu.com; path=/

				请求体:两种格式
				 1:文本格式
				 2:二进制格式--会有分隔符
		Response
			返回头:
				Bdpagetype: 1
				Bdqid: 0xd607cdc0002bd2fc
				Cache-Control: private
				Connection: Keep-Alive
				Content-Encoding: gzip
				Content-Type: text/html
				Cxy_all: baidu+bad58791e72c0092c319a0a13d8c76de
				Date: Fri, 05 Jul 2019 01:17:21 GMT
				Expires: Fri, 05 Jul 2019 01:17:18 GMT
				Server: BWS/1.1
				Set-Cookie: delPer=0; path=/; domain=.baidu.com
				Set-Cookie: BDSVRTM=0; path=/
				Set-Cookie: BD_HOME=0; path=/
				Set-Cookie: H_PS_PSSID=1452_21090_29135_29238_28518_29098_28835_29220_29071; path=/; domain=.baidu.com
				Strict-Transport-Security: max-age=172800
				Transfer-Encoding: chunked
				Vary: Accept-Encoding
				X-Ua-Compatible: IE=Edge,chrome=1
			返回体:
## nodejs在windows上面的安装和环境变量
   环境变量:访问一个命令后,应该去当问哪个程序,来响应环境变量
### 一:后端的规范与思想
	1:分层 
		(1):Web(controller)层:接受和发送http请求的,封装,判断参数是否非法
		(2):业务逻辑(服务层Service)层:接受参数,判断是否非法,获取用户的密码,进行比较
		(3):DAO数据访问层:
			业务:对对象进行操作
			如果要存储:对象 转化为 数据 
			如果要读取:数据 转化为 对象
		(4):持久(数据库)层:存在磁盘上,
		命名:login为例
		Waoeb层:LoginController
		服务层:LoginService
		DAO层:LoginDAO
		Domain:User
		符合单一职责原则,
	2:模块化
		(1):导入导出(es6,import,export)
		(2):先引入 bootstrap,弹层,表格(缺点:缺少模块化概念)
			在模块化之前,如果没有bootatarp,如果弹层和表格的页面都需要使用bootstrap
			,就需要没一个页面都自己写一个bootstrap,这样就导致代码被重复使用,不利于
			模块化
		(3):JS缺乏管理机制
		NPM npm install:都是从中央代码仓库下载代码
	3:NodeJs模块化
		模块化最重要的两个词:require('xxx');
		require('./test.js');如果是系统的东西,可以直接使用.如果是自己定义的需要加相对路径
		module.exports:导出当前模块,module.exports默认是一个空对象,简写可以写成exports
						module.expors和exports有什么区别?
						module.exports和exports 开始的时候同时指向了同一块空间,
						module.expors="a";
						exports=b;最后会打印一个a
						如果给其中一个新的引用,则不会同时指向同一空间,最后导出module.exports
						但是实际上是导出的永远是module.expors
						规范,永远使用module.expors
	4:requie和module.expors,expors为什么拿来就可以使用?
		nodejs的模块是运行在一个函数中的,类似如下函数,可以在node下任何一个js文件中console.log(arguments)得到验证
		function x(exports,require,module,__filename,__dirname){
				var a=1;
				var b=2;
				module.exports.a=a;
				module.exports.a=b;
				return modle.exporst
		}
		Moddule详解:
			Module {
				  id: '.',
				  exports: {},
				  parent: null,//当前js文件快,被使用到的js文件,谁引用我
				  filename: 'E:\\Works\\Applications\\NodeJs\\Lession03\\index.js',
				  loaded: false,
				  children: [],//当前js文件引入其它的js,我引用的其它jswenjian 
				  paths:npm引入的第三方库
				   [ 'E:\\Works\\Applications\\NodeJs\\Lession03\\node_modules',
					 'E:\\Works\\Applications\\NodeJs\\node_modules',
					 'E:\\Works\\Applications\\node_modules',
					 'E:\\Works\\node_modules',
					 'E:\\node_modules' ] 
			}
### NodeJsApi
#### net 网络 (TCP/IPC层)
	1:socket 
		(1):事件
			connet
			data
			timeout
			error
			close
		(2):属性
			remoteAddress
			remotePort
			localAddress
			localPoar
		(3):方法
			setTimeOut
			write
			setEncoding
	2:server
		(1):事件
			listening 监听端口
			connection
			close
			error
		(2):方法
			listen
			end
			address
			
	3:例子
	```
	服务器端
	var server=net.createServer();//创建服务器
	server.listen('12336',"127.0.0.1");//设置服务器的端口和Ip
	server.on('listening',function(){//监听服务器
		console.log("服务已启动");
	})
	server.on('connection',function(socket){//监听请求的连接
		socket.on('data',function(data){//监听收到消息
			var url=data.toString().split("\r\n")[0].split(" ")[1];
			try{
				var data=fs.readFileSync(__dirname+conf.path+url);
				// socket.write("HTTP/1.1 200OK\r\n\r\n"+data.toString());//纯文字
				socket.write("HTTP/1.1 200OK\r\n\r\n");//返回消息
				socket.write(data);//文件和文字//返回消息
			}catch(e){
				socket.write("HTTP/1.1 404NotFound\r\n\r\n<html><body><h1>404</h1></body></html>");
			}
			socket.end();//结束服务器连接
		})
	})
	客户端:
	var net = require('net');
	var socket = net.connect(12306, '127.0.0.1');//要连接的端口和ip
	socket.on('connect', function() {//监听连接
		console.log('已经连接到服务器');
		socket.write('你好啊.服务器');//通过连接向服务器发送消息
	});
	socket.setTimeout(3000);//设置超时时间,超过设置的事件服务器还没相应为超时
	socket.on('timeout',function(){
		console.log('超时了');
	})
	socket.on('data', function(data) {//接收服务器发送回来的消息
		console.log(data.toString());
		socket.end();//关闭客户端连接
	});
	socket.on('close', function(data) {//客户端连接关闭的时候触发的事件
		console.log("客户端连接已关闭");
	});
	```
#### http
```
var http=require('http');//引入http模块
var url=require('url');
var conf=require('./config.js');
var fs=require('fs');//引入文件操作模块
var loader=require('./loader.js');
var log=require('./log');//引入日志文件操作模块
http.createServer(function(request,response){//创建http请求服务器
	var pathName=url.parse(request.url).pathname;
	var param=url.parse(request.url,true).query;
	log.write(pathName);
	var isState=isDataState(pathName);;
	if(isState){
		try{
			var data=fs.readFileSync(conf['page_path']+pathName);//同步读取文件操作
			response.writeHead(200);
			response.write(data);
			response.end();
		}catch(e){
			response.writeHead(404);
			response.write('<html><body><h1>抱歉,没找到</h1></body></html>');
			response.end();
		}
	}else{
		if(loader.get(pathName)!=null){
			try{
				loader.get(pathName)(request,response);
			}catch(e){
				response.writeHead(500);
				response.write('<html><body><h1>服务器内部错误</h1></body></html>');
				response.end();
			}
			
		}else{
			response.writeHead(404);
			response.write('<html><body><h1>抱歉,没找到</h1></body></html>');
			response.end();
		}
	}
}).listen(conf.port);//监听http请求的端口
```
### 文件操作
```
1:引入文件操作模块
	var fs=require('fs');
2:文件操作
   (1):文件的读取操作
	   同步读取:fs.readFileSync(filenPath);
	   异步读取:fs.readFileSync(filePath);//一般不使用
	(2):文件写入操作
	   同步写入:fs.writeFile(fileName,content,opertion,callback);
	   异步写入:fs.writeFilesSync(fileName,cotent,opertion);
	(3):写入文件权限操作
	   fs.writeFile(fileName,content,{flag:'a'},callback);//a是追加写入
	   flag      可读        可写       可创建       可追加
	   r           √
	   r+          √          √
	   rs          √
	   rs+         √          √
	   w                      √            √
	   wx                     √            √
	   w+          √          √            √
	   wx+         √          √
	   a                      √            √            √
	   ax                     √            √            √
	   ax          √          √            √            √
	   ax+         √          √            √            √
	   
	   
	   r,w,a常用权限,带s的权限是同步操作,带x是独占资源,带+的是补全读写操作(有读的添加写操作,有写的添加读操作)
```
## nodejs和mysql数据库