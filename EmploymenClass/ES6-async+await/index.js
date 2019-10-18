/**
 * author  张高瑞 创建
 * date 2019-10-07 15:10
 */

// let obj={
//     name:'li',
//     age:'12'
// }
// let {name,age}=obj;
// console.log(name,age);
//
// let {0:x,1:y,2:z}=[7,8,9];
// console.log(x,y,z);
// let {forEach}=[7,8,9];
// console.log(forEach);

// let arr=[1,2,3,{name:'sss'}];
// let [,,,{name}]=arr;
// console.log(name);

// let {name,age,address,hoppy}={name:'天劫',age:18,address:{country:'中国',city:'郑州',area:'金水区'},hoppy:['羽毛球','乒乓球','溜溜球']};
// console.log('姓名:',name,'年龄:',age,'地址:',address,'爱好:',hoppy);
// 第一种:数据劫持,检测数组的push方法;
// let arr=[1,2,3,4];
// let push=Array.prototype.push;
// function update(value){
//     console.log('我检测到了你push了数据: '+value);
// }
// Object.defineProperty(Array.prototype,'push',{
//     value:(function(arg){
//         return function(...arg){
//             push.apply(this,arg);
//             update(arg);
//         }
//     })()
// })
//第二种数组劫持,对象嵌套的对象情况需要使用到递归
// let obj={
//     name:'天劫',
//     age:22,
//     sex:'male',
//     arr:[100,200,400,600],
//     address:{
//         country:'中国',
//         city:'河南',
//         area:'郑州'
//     }
// }
//
// let newObj=new Proxy(obj,{
//     set:function(target,key,value,receiver){//target 原对象,key属性,value 设置的值,reserver:代理对象
//         Reflect.set(target,key,value);
//         updateObj(key,value);
//     },
//     get:function(target,key,value){
//         return  Reflect.get(target,key);
//     }
// });
//
// function updateObj(prop,value){
//     console.log('您更新了这个属性',prop,'值是:',value);
// }
//js各种继承的分析;
function Parent(name,age){
      this.name=name;
      this.age=age;
      this.money=100;
      this.fly=function(){
          console.log('这是对象本身的fly方法');
      }
}
Parent.prototype.sex='male';
Parent.prototype.play=function(){
    console.log('这是原型上面的play方法');
}
var parent=new Parent('父亲',45);
//1:第一种:原型指向父类实例
// function Sub(name,age) {
//     this.name=name;
//     this.age=age;
// }
// Sub.prototype=new Parent('天劫','18');
// var  sub=new Sub('小明',11);
// var  sub1=new Sub('小红',12);
// console.log(sub instanceof Sub); true;
// console.log(sub instanceof Parent);true;
// // 优点：
// 这是一个非常纯粹的继承，实例是子类的实例，也属于父级的实例，父类的属性方法以及父类原型上添加的属性或方法，子类都可以访问得到；
//
// 缺点：
// 原型对象上的引用属性，所有的实例都是共享的，即在一个实例上修改，所有的实例均跟着变化；
// 不能同时继承多个父类。

//第二种:构造函数
// function Sub(name,age) {
//     Parent.apply(this);
//     this.name=name;
//     this.age=age;
// }
//
// var  sub=new Sub('小明',11);
// var  sub1=new Sub('小红',12);
// console.log(sub instanceof Sub); true;
// console.log(sub instanceof Parent);false;
// 优点：
// 这种继承方式解决了传统继承中共享引用属性的问题；
// 创建子类实例的时候可以向父级传递参数；
// 可以继承多个父类；
//
// 缺点：
// 只能继承父类构造函数里面的属性方法，不会继承父类原型上的属性方法；
//  无法实现函数复用，每个子类都有父类实例的副本，影响性能；
// 实例只是子类的实例不是父类的实例。
//第三种:原型指向父类实例+构造函数

// function Sub(name,age) {
//     Parent.apply(this);
//     this.name=name;
//     this.age=age;
// }
//
// Sub.prototype=new Parent('父亲',45);
// var  sub=new Sub('小明',11);
// var  sub1=new Sub('小红',12);
// console.log(sub instanceof Sub); true;
// console.log(sub instanceof Parent);true;

// 优点：
// 可以继承多个父类；
// 既可以继承父类构造函数里面属性和方法，又可以继承父类原型属性和方法；
// 函数可以复用；
// 父类的引用值不会共享；
//
// 缺点：
// 调用了两次父类的构造函数，产生了两份父类实例，多消耗了一点内存。

//第四种. 循环拷贝继承

// function Sub(name,age) {
//     var parent=new Parent(name,age);
//     for(var prop in parent){
//         Sub.prototype[prop]=parent[prop];
//     }
// }
//
// var  sub=new Sub('小红',12);
// console.log(sub instanceof Sub); true;
// console.log(sub instanceof Parent);false;
// 优点：
// 可以继承多个父类；
// 可以将父类的所有属性和方法均继承下来；
//
// 缺点：
// 效率较低；
// 实例不属于父类的实例。
//第五种:循环拷贝+构造函数
// function Sub(name,age) {
//    Parent.call(this,name,age);
// }
// for(var prop in Parent.prototype){
//     Sub.prototype[prop]=Parent.prototype[prop];
// }
//
// var  sub=new Sub('小红',12);
// console.log(sub instanceof Sub); true;
// console.log(sub instanceof Parent);false;
// 优点：
// 可以继承多个父类；
// 可以将父类的所有属性和方法均继承下来；
// 缺点：
// 效率较低；
// 实例不属于父类的实例
//第六种:共享原型
// function Sub(name,age) {
//  // Parent.call(this,name,age);
//     this.name=name;
//     this.age=age;
// }
//
// Sub.prototype=Parent.prototype;
// var  sub=new Sub('小明',11);
// console.log(sub instanceof Sub); true;
// console.log(sub instanceof Parent);true;
// 优点：
// 最简单的继承方式之一；
//
// 缺点：
// 只能继承父类原型属性方法，不能继承父类构造函数的属性方法；//可以使用构造函数继承,解决这个问题
// 子类共享原型上的引用属性
//第七种:圣杯模式
// function Sub(name,age){
//     Parent.call(this,name,age);
// }
// function inherit(sub,parent){
//     function Temp(){}
//     Temp.prototype=parent.prototype;
//     sub.prototype=new Temp();
//     sub.prototype.constructor=Parent;
//     sub.prototype.uber=Parent;
// }
// inherit(Sub,Parent);
// var  sub=new Sub('小明',11);
// console.log(sub instanceof Sub); true;
// console.log(sub instanceof Parent);true;
// // 优点：
// 堪称完美；
//
// 缺点：
// 实现复杂；
// 不能实现多继承。
//
// 总结：
// 继承实现方法很多，最好的继承方式是圣杯模式的继承和js循环拷贝两种，需要注意的是圣杯模式继承不能实现继承多个父类，只有循环拷贝继承才可以很完美的实现继承多个父类。
//ES6三种继承模式
// AttackPlane.prototype.__proto__=Plan.prototype;//慎用
// AttackPlane.prototype=Object.create(Plane.prototype,function(){
//     constructor:AttackPlane;//修改构造函数
// })
// Object.setPrototypeOf(AttackPlane.prototype,Plane.prototype);//ES6,推荐




