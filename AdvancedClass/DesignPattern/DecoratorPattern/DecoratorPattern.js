function PlaneFactory(){
    this.decorate_list=[];
}
//集合所有的装饰方法
PlaneFactory.prototype.decorates={
    eatOneLife:function(obj){
        obj.blood+=100;
    },
    eatTwoLife:function(obj){
        obj.blood+=200;
    },
    eatShrinkLife:function(obj){
        obj.blood-=50;
    }
}
//搜集对某个对象的描述
PlaneFactory.prototype.decorate=function(decorate){
    //
    this.decorate_list.push(decorate);
}
//让装饰方法作用在该对象的身上
PlaneFactory.prototype.update=function(decorate){
    console.log(this.decorate_list)
    for (var i = 0; i < this.decorate_list.length; i++) {
        this.decorates[this.decorate_list[i]]&&this.decorates[this.decorate_list[i]](this);
    }
}
//子类工厂都可以抵用的公共方法
PlaneFactory.prototype.touch = function() {
    this.blood -= 10;
    if (this.blood == 0) {
        this.die();
    }
}
PlaneFactory.prototype.die = function() {
    console.log('die');
}
//创建对象
PlaneFactory.create = function(type) {
    //判断是否存在该类型的子类工厂
    if(PlaneFactory.prototype[type]==undefined){
        throw 'no this constructor';
    }
    //继承
    if(PlaneFactory.prototype[type].prototype.__proto__!==PlaneFactory.prototype){
        PlaneFactory.prototype[type].prototype=new PlaneFactory();
    }
    var arg=[].slice.call(arguments,1);
    var newPLane = new PlaneFactory.prototype[type](...arg);
    return newPLane;
}
//定义子类工厂
PlaneFactory.prototype.SmaillPlane = function(x,y) {
    this.x=x;
    this.y=y;
    this.width= 100,
        this.height=100,
        this.blood=100,
        this.name= 'SmallPlane'
}
PlaneFactory.prototype.BigPlane = function(x,y) {
    this.x=x;
    this.y=y;
    this.width= 150,
        this.height=150,
        this.blood=150,
        this.name= 'BigPlane'
}
PlaneFactory.prototype.AttackPlane = function(x,y) {
    this.x=x;
    this.y=y;
    this.width= 200,
        this.height=200,
        this.blood=200,
        this.name= 'AttackPlane'
    this.attack= function() {
        console.log('biubiubiubiu');
    }
}
var sPlane=PlaneFactory.create('SmallPlane',10,20);
var bPlane=PlaneFactory.create('BigPlane',20,30);
var aPlane=PlaneFactory.create('AttackPlane',30,40);
sPlane.decorate('eatOneLife');
sPlane.decorate('eatTwoLife');