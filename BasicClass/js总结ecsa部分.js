//1:javascript
// 2:编译型语言,不跨平台,执行快
// 3:js解释性语言(php,pyhon),跨平台,相对编译性语言来说,慢
//2:数据类型:
// 1:原始值:String,Bloolan,null,undefined,Number,
// 2:引用值:Array,Object,Function
//3:短路语句
//  num&&console.log('1111');//当num为真的话,则执行后面的语句
    




//1:如果一个代码款不可避免的会出现错误,为了不影响后面的代码款执行的话,可以用多个<script></script>块分割
// <script>
// console.log(a);
// </script>
// <script>
// var b=10;
// console.log(b);
// </script>
//2:裴伯纳西数列新写法,for循环游标算法
var first=1,second=1,third;
for (var i = 0; i <n-2; i++) {
	third=first+second;
	first=second;
	second=third;
}
//3:typeof 返回的六大类型,number,string,undefined,boolean,object,function,返回的所有数据类型都是字符串形式
console.log(typeof(typeof(a)));//返回值是字符串类型的undefined
//4:函数声明的区别
function fun(){}//普通声明
var fun1=function(){}//表达式声明一
var fun2=function abc(){}//表达式声明二
//普通声明和标识声明一都可以通过fn(),fun1()直接调用,fun2的abc声明无效,只能通过fun2()调用,不能通过abc()调用
//区别:
console.log(fun.name);//fun
console.log(fun1.name);//fun1
console.log(fun2.name);//abc
//5:函数中的参数
function fn(a,b,c,d,e){//a,b是函数fn的形参,相当于在函数内部定义了两个,a,b变量
	console.log('形参:'+fn.length);//fn.length是形参的个数
	// console.log(a+":"+b);
	console.log(arguments);//arguments,里面是包含了所有实参的数组
	a=15;
	console.log(arguments[0]);//当形参的数值发生改变你的时候,arguments里面的值会改变
	arguments[0]=28;
	console.log(a);//当修改arguments里面对应的形参值的话,对应参也会改变
	c=26;
	console.log(arguments[2]);//形参的个数大于实参,arguments里面并不会储存
	
}
fn(3,2)//3,2是实参

//函数作用域

function fn(a){ 
	console.log(a);
	console.log(b);
	console.log(d);
	console.log(f);
	var a=123;
	console.log(a);
	function a(){}
	console.log(a);
	var b=function(){}
	console.log(b);
	var d=function(){}
	console.log(d);
	function f(){
		
	}
}
fn(3); 
//函数的AO对象
AO:{
	a:a(){},
	b:undefined,
	d:undefined,
	f:f(){}
}


function test(a,b) {
	console.log(a);
	console.log(b);
	var b=234;
	console.log(b);
	a=123;
	console.log(a);
    var a=function a(){ }
    var a;
    b=234;
    var b=function (){}
    console.log(a);
    console.log(b);
}
test(1);
AO:{
	b:function(){},
	a:function(){}
}

function a(){
	var a=1;
	function b(){
		a++;
		console.log(a);
		var b=10;
		function d(){
			b++;
			a++;
			console.log(a);
			console.log(b);
		}
		return d;
	}
	return b;
}
var c=a();
var d=c();
c();//2
d();//3,11
//prototype和__prototype__

Person.prototype.name="sunny";
function Person(){
//	var this={
//		__prototype__:Person.prototype;系统默认的隐式声明
//	}
}
//Person.prototype.name="cherry";
var person=new Person();
//console.log(Person.prototype.name);
//Person.prototype.name="cherry";
//person.prototype={name:'charry'}
console.log(Person.prototype.name);
