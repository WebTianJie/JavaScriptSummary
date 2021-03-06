## 一:vue的基础知识
### 1:性能好
    1:重排和重绘
    当dom的变化影响了元素的集合属性(宽, 高),浏览器需要重新计算元素的几何
    属性,同样其它的元素的几何属性和位置也会受到影响.浏览器会使渲染树中
    受到影响的dom收到影响的部分失效,并重新构造渲染树;这个过程称为重排;
    完成重排以后,浏览器会重新绘制受影响的部分到屏幕中去,该过程被称为重绘
    2:那些css改变的时候,会重新排
       1:添加,删除可见的dom
       2:元素位置发生变化
       3:元素的尺寸发生变化(外边距,内边距,边框,宽度,高度等)
       4:内容改变,文本改变或者图片被另外一张图片改变
       5:页面渲染初始化
       6:浏览器窗口的尺寸改变
       7:参考 css对象重绘重排的影响 http://csstrigger.com/
    3:触发重排的属性
      offsetTop,offsetLeft,offsetWidth,offsetHeight
      scrollTop,scrollLeft,scrollWidth,scrollHeight
      clientTop,clientLeft,clientWidth,clientHeight
      getComputedStyle();
	操作dom是影响性能,因为操作DOM代价是昂贵的,重绘,重排,
	vue使用的虚拟Dom,也称为伪Dom
	所谓虚拟的dom即为伪dom,假的dom,它不是一个真实的dom,而是有js来模拟的出来具有dom结构的一个树形结构;
	js虚拟dom
	var rootDom={
	   id:'bodyRoot'
	   tagName:"body",
	   type:1,
	   attrs:[style,data-attrs],
	   children:[
	        {
	        id:'h1'
	        type:1,
	        tagName:'h1',
	         attrs:[style,data-attr],
	         content:'这里是h标签的内容'
	        }
	   ]
	}
### 2:视图,数据分离
	只关心数据的变化,视图会跟着更新
### 3:维护成本低
	跟jquery相比,代码更小,更少,更简洁,开发维护比价放方便
### 4:MVVM
	数据逻辑层:model
	视图呈现:view
	数据到视图的桥梁:viewmodel
## 二:vue使用
#### 1.:插值表达式 {{'aaa'}}//字符串显示
#### 2.:{{1+1}} //计算表达式,js语句,不能写在里面但是三元表达式是可以的
#### 3.:{{name}}//差值表达式里面用到的值必须在data里面是定义过数据,只有数据先存在的时候,才能进行数据的双向绑定,第一次渲染后,动态添加的数据是不具备动态渲染的能力的;
```
 const app= new Vue({
		el:'#app',
		data:{
			name:"beiming",
			desc:"haha"
		}
	})
```
#### 4:通过索引方式改变,通过修改数组长度的方式,不能重新渲染视图
####	5:数组编译方法
   #####		1:push,prop,shift,unshift,reverse,splice 通过这些方法,修改数组,可以渲染视图
####	5:对象:新添加的属性, 不会渲染视图
   #####	1:app.$set(app.obj,'xxx','90');//vue提供方法
   #####		2:app是new vue()实例返回,app.obj是要修改的对象,xxx是要修改的属性,90是要修改的值
####	6:app.$el //vue挂载的dom对象,渲染视图是异步的
####	7:$nextTick
		```
		app.$nextTick(()=>{
				console.log('数据改变以后,视图已经修改完毕,才会执行该方法');
			})
		```
		
####	8:app.$mout('#app');动态挂载元素
## 三:常用命令
    1:v-pre:不会渲染的内容,
    2:v-cloak文件编译之前存在,编译之后就不存在了,
    3:v-once:始终显示第一次渲染的值,不会再被修改,
    4:v-html:显示字符串类型的代码,代码会被编译,
    5:v-text:文字处理,就算有代码的话,也会被当做字符串处理
	6:v-if:根据值显示是否显示里面的元素 元素会被先删除,再添加,
	    v-else if:配合v-else来使用,
	    v-else:配合v-else来使用,v-else上面不能出现其他元素,
	    v-show:根v-if功能是一样的:控制元素的css显示和隐藏,不支持Template
	7:Template,模板,不会显示在页面
	8:v-bind:绑定属性
		v-bind:src,v-bind:href,v-bind:data-src
		简写: :src,:href,:data-src
		注意:class多个class用数组 :class="[red,blue]" 根据一个值确定是否添加(使用对象的方式):class="{red:true}"
	9:绑定style :style="{width:100px,height:100px}"
	10:绑定事件:v-on:click,简写@click,methods里面的函数不能和data里面的函数重名
	11:v-for
```
 <div v-for="{item,index} in arr" :key="index"></div>//在脚手架搭建的项目总必须要有key,key的值是唯一的,key值不能给Template
 注意:v-for="(key,value) in 8" 是循环的1-8的值
```
		
#####	 8:模板字符串:"`你好我是{{name}}_li`" name会和_li拼接出来的字符换
#####	 9:v-model:数据的双向绑定,
        radio,checkbox数据双向绑定,绑定是的多选框/单选框的value值,checkbox值也是放在数组里,
        select绑定的值是option的value值,多选的时候绑定对应的是数组,input事件的时候触发
		v-model.lazy 触发input的change事件
		v-model.trim 删除值的前后空格
		v-model.number 输入的数据是number类型,如果是无法转换成数字的字符串,则还是string类型
#####	 10:$event 在vue中,传递参数多个参数的话,e就不会被传递,vue使用$event来代替e传入
#####	 11:修饰符`<input @keyup.enter="add">` 按下enter的时候,触发事件
		配置键盘的值
		Vue.config.keyCode={
			f1-Key:112//必须是短横线分隔符,才可以
		}
		<input @keyup.f1-Key="add">//按下了键值是112的键
## 四:全局自定义指令,局部自定义指令
### 1:Vue.directive
	Vue.directive('slice',(el,bingding,vnode)=>{//函数方式
			el指令绑定的元素,
			binding:绑定的信息,
			vnode虚拟节点,修改虚拟节点就会触发视图更新
	})//自定义质量,可以通过v-slice使用指令
	```
	Vue.directive('slice',//对象方式,//全局自定义指令
		{
			bind(el,bingding,vnode){//第一绑定的时候触发
				const context=vnode.context;
				let length=bingding.arg||5;
				let initValue=context[bingding.expression].slice(0,length);
				var  numberFlag=bingding.modified.number;
				if(numberFlag){
					initValue=initValue.replace(/[^0-9]/,'');
				}
				initValue=initValue.slice(0,length);
				el.value=initValue;
				context[bingding.expression]=initValue;
				el.oninput=e=>{
					let value=e.target.value;
					if(numberFlag){
						value=value.replace(/[^0-9]/,'');
					}
					let val=value.slice(0,length);
					context[bingding.express]=val;
					el.value=val;
				}
			}
			update(el,bingding,vnode){//虚拟节点更新/修改的时候触发
				let content=vnode.context;
				var  numberFlag=bingding.modified.number;
				let value=content[bindings.expression];
				if(numberFlag){
					value=value.replace(/[^0-9]/,'');
				}
				el.value=value;
			},
			inserted(el){//获得焦点时触发
				el.focus();
			}
		}
	)//自定义指令,可以通过v-sclice使用指令
	const vm=new Vue({//局部自定义指令,只能在#app元素内部使用
		el:"#app",
		directive:{
			slice:(ele.bindings,vnode){
				
			}
		}
	})
	const vm1=new Vue({
		el:"#app1",
		directive:{
            slice:(ele.bindings,vnode){
                
            }
            pop:(){
            
            }
        }
	})//此处slice,pop都是局部指令
	```
## 五:过滤器
####	1:不改变原有数据的情况,修改数据的展示格式,过滤器可以有多个,过滤器也可以定义局部的
	```
	全局定义过滤器
	data:{
		money:10000
	}
	{{money|toMoney(2)|ceshi}}
	Vue.filter('toMoney',(value,times)=>{//第一个参数,永远是原始数据
		consoe.log(value);1000
		return (value*2).toLocalString();
	})
	Vue.filter('ceshi',value=>{//第二个过滤器是过滤的前一个过滤器的的值
		console.log(value);//20000
		return value;
	})
	```
	局部定义过滤器
	 let app=new Vue({
            el:'#app',
            data:{
                contents:'jkshfkahfkj'
            },
            filters:{//局部过滤器
                toMoney(){
                },
                ceshi(){
                }
            }
        })
## 六:el,Template,render
####	1://渲染过程:先检测el绑定的元素->查看是否存在template,如果存在的话->查看是否存在render函数,如果存在render函数,按照render函数来渲染,如果不存在的话,就按照template来渲染
	
	const vm=new Vue({
		el:"#app",
		template:'<h2>{{msg}}</h2>',
		render(createElement){//不会使用之前的模板了,会使用render函数返回的元素
			return createElement('h1',
			{
				class:'demo',
				style:{
					width:'100px';
					height:'2001px'
				}
			},
			'我是一个标题',
			['我是一个标题'.
			 createElement('p','我是一个p标签')
			]
			)
		}
	})
#### 2:jsx语法(rect中使用)
	const vm=new Vue({
		el:"#app",
		template:'<h2>{{msg}}</h2>',
		render(h){
			const tag="div";
			<tag class="demo" 
			style={{color:'red',fontSize:'12px'}} 
			on-click={{()=>{console.log('demo')}}}>
			我是标题一
			<p>我是一个p标签</p>
			</tag>
		}
	})
## 七:vue的生命周期
####	1:周期函数 $created,类似这样调用,可以调用vue里面的函数,和属性
	const vm=new Vue({
		el:'#app',
		data:{
			name:'111'
		}
		beforeCreate(){
			//不能获取data $data
			console.log($data);
		},
		created(){
			//可以拿到data
			//ajax
		},
		beforeMount(){
			//el还没有进行虚拟dom的编译,{{name}}还没有被编译
		},
		mounted(){
			//也可以调用ajax,推荐在这里,
			//挂载完毕,{{name}}已经被编译为具体的数据
		},
		beforeUpdate(){
			//更新之前,可以在这里面操作需要修改的data里面的数据
		},
		updated(){
			//更新完毕,不要再这里进行数据操作,不然的话可能导致死循环
		},
		beforeDestroy(){
			//销毁之前,销毁定时器
		},
		destroyed(){
			
		}
		
	})
	周期函数不是methods里面的函数

##  八:计算属性和侦听器
####	1:computed//计算属性,可以使用多个属性得到一个新的属性,计算属性不是data里面的属性,定义在data的外面 
    - 关于computed
        计算属性，其中的配置会提升到vue实例中，因此，在模板中可以直接当作属性使用，使用时，实际上调用的是对应的方法。
        通常，计算属性用户通过data或其他计算属性得到的数据。
    
        与方法的区别： 
        1）vue会检查计算属性的依赖，当依赖没有发生变化时，vue会直接使用之前缓存的结果，而不会重新计算
        2）计算属性的读取函数，不可以有参数
        3) 计算属性可以配置get和set，分别用于读取时和设置时
    
    - 关于v-html指令
        vue为了安全，会将元素内部的插值进行实体编码
    
    - 关于ES6模块化
        面对大型项目，传统开发的问题：
        1）如何管理错综复杂的代码
        2）如何处理全局变量污染的问题
        3）如何管理复杂的依赖关系
    
        实现模块化的方式：CommonJS、AMD、CMD、ES6
        
        ES6模块化：
        - 模块中的所有变量，全部是布局，只能在模块内部使用
        - 模块导出：export default 导出的数据
        - 模块导入(在所有代码之前导入)：import 变量名 from "模块路径"
	{{person}}
	{{person()}}
	const vm=new Vue({
		el:'#app',
		data:{
			name:'shanshan',
			age:'18',
			p:''
		},
		methods:{
			getPerson(){
				this.p=`姓名+${this.name}+年龄+${this.age}`;
			}
		},
		computed:{
			person(){//{{person}} 这样可以调用.如果数据不修改,则不会执行该属性
				return `姓名+${this.name}+年龄+${this.age}`
			},
			person1:{
				get(){
					return this.n+this.n1;
				},
				set(val){//虽然能检测到,但是还是不会去修改data的属性
					const avg=val/2;
					this.n=this.n1=avg;
				}
			}
			
		},
		mounted(){
			this.getPerson();//常规的函数方法
		}
		,
		watch:{//不会再第一次渲染页面的执行,可以在首次加载的时候,手动触发
			name(){//监听name值的变化
				this.p=`姓名+${this.name}+年龄+${this.age}`;
			},
			age(){//监听age的变化
				this.p=`姓名+${this.name}+年龄+${this.age}`;
			}
			复杂写法
			name:{
				handler(){
					this.p=`姓名+${this.name}+年龄+${this.age}`;
				},
				immediate:true;是否立即执行这个函数,在第一次渲染时候,会执行handler函数
			},
			age:{
				handler(){
					this.p=`姓名+${this.name}+年龄+${this.age}`;
				}
			}
		}
	})
	vm.$watch('name',()=>{
		console.log('侦听name的变化');
	},{
	    immediate:true
	})
####	1:计算属性computed和method区别,
		computed,有缓存机制,数据发生改变才会触发,method没有缓存机制,每次都会触发
####	2:computed和wathc区别,
		computed可以一次观察多个属性,相当于给vue添加了一个属性,不可执行异步
		watch一个函数只能观察一个属性,观察的是vue本身的属性,可以执行异步
####	3:数据查找顺序 data->methods->computed,在其中一个找到,就不会继续往下找

## 九:组件初识
    
1. 什么是组件

组件是页面中的一个可复用的功能单元

2. vue中的组件

    组件的创建：组件对于开发者，是一个普通的配置对象，该配置对象几乎和之前学习的vue配置一致。
    
    组件的注册：
    1. 全局注册
    2. 局部注册: 在使用的组件会vue实例配置中通过components注册
    原则：除了全局通用的组件，并且经常用到的组件使用全局注册，否则尽量局部注册
    
    组件名称的规范，以下命名方式任选其一：
    1. 使用短横线命名
    2. 大驼峰命名法
    
    组件的使用：把组件当作标签使用即可，标签名任选其一
    1. 短横线命名法
    2. 大驼峰命名法
    
    组件可以嵌套重复使用，因此，会形成一个组件树，树的根叫做根组件
	Vue.components('hellow-word',{//,全局组件,在命名时候就算是使用大驼峰和小驼峰命名的时候,调用组件的时候还是使用中划线连接
			data(){//data写成函数的形式,不会影响其它组件的属性,都在自己的作用域里面,因为函数建立了自己的作用域
				return {
					msg:'hellow world'
				}
			},
			template:'<div>{{msg}}<div/>'
		})
		const vm=new Vue({
			el:'#app',
			components:{//局部组件,使用方式和全局组件一致
				hellow-word:{
					data(){
						return msg:'hellow word'
					},
					template:`<div>{{msg}}</div>`
				}
				
			}
		})
## 十:组件传递数据和属性校验
    <div id="app">
        <my-content a="1" b="2" :title="title" :content="content" :count="count"></my-content>
    </div>
	const vm=enw Vue({
		el:'#app',
		data:{
		    title:'title',
		    content:'content',
		    count:'count'
		}
		components:{
			props:['title','content','count'],组件内部注册的属性,这些属性不会保留到组件渲染后的html行间属性上,如果未注册的,则会留在上面
			prop:{
				content:{
					type:Array,
					default:()=>[1,2,3]//当属性类型是Array或者是对象的时候,设置默认值必须是一个函数返回默认值
				},
				title:{
					type:String,
					required:true,//必填属性
					default:'默认值'
				},
				count:{
					type:number;
					validator(value)=>{
						return value>=10;
					},
					required:true;
				}
			}
			myContent:{
				template:'<div><h3>{{title}}</h3><p>{{count}}</p></div>'
			}
		}
	})
## 十一:组件间通信
###  1:父组件向子组件传值 
		方法:属性,$parent,provide
####	1:父组件向子组件传值,$atrr(不推荐使用,推荐使用属性)获得所有的绑定属性
          <div id="app">
                <my-content a="1" b="2" :title="title" :content="content" :count="count"></my-content>
            </div>
			const vm=enw Vue({
				el:'#app',
				data:{
					content:'我是内容,我是内容,我是内容我是内容我是内容',
					title:'我是标题'
				}
				components:{
                        myContent:{
                             props:['title'],
                             created(){
                                console.log($attrs);
                             },
                            inheritAttrs:false,//没有被注册的属性,不会在行间显示
                            template:`<div>
                                <h3>{{title}}</h3>
                                <my-p v-bind="$attrs"></my-p>
                            </div>`,
                            components:{
                                myP:{
                                     props:['content'],
                                     template:`<p>{{content}}</p>`
                                }
                            }
                        }
					}
					
				}
			})

### 2:$parent(不推荐使用,推荐使用属性)父组件实例,可以链式调用,$parent.$parents,$.children可以获取子组件的实例,子组件是在挂载完以后才出现的,
      <div id="app">
            <my-content></my-content>
        </div>
        const vm=enw Vue({
            el:'#app',
            data:{
                content:'我是内容,我是内容,我是内容我是内容我是内容',
                title:'我是标题'
            }
            components:{
                    myContent:{
                         created(){
                            console.log(this.$parent.title);
                         },
                         mounted(){
                            console.log(this.$chidren);
                         },
                        template:`<div>
                            <h3>{{title}}</h3>
                            <my-p></my-p>
                        </div>`,
                        components:{
                            myP:{
                                created(){
                                  this.content=this.#parent.$parent.content
                                }
                                 template:`<p>{{content}}</p>`
                            }
                        }
                    }
                }
                
            }
        })
####		2:provide (不推荐使用,推荐使用属性)共享属性,子组件和后代组件都可以使用inject来使用属性

		const vm=new Vue({
				el:'#app',
				provide:{
					content:'我是内容,我是内容,我是内容我是内容我是内容',
					title:'我是标题'
				}
                  components:{
                        myContent:{
                            inject:['title'],
                            template:`<div>
                                <h3>{{title}}</h3>
                                <my-p></my-p>
                            </div>`,
                            components:{
                                myP:{
                                    inject:['content'],
                                     template:`<p>{{content}}</p>`
                                }
                            }
                        }
                    }
                    
                }
			})
###		2:子组件向父组件传值  $children拿到子组件的实例,可以链式调用,
			方法:$chiildren,$refs,$listeners,$emit(),@click.native
			<div ref="dom"></div>
			<my-content @click.natvie="func"></my-content>//组件普通的绑定事件无法生效,通过@click.native可以把组件变成原生的dom元素,可以触发事件,不推荐使用
			<my-content @click="func"></my-content>
####			1:ref   $ref只能活到绑定该属性的最后一元素,如果是通过for循环添加的属性,保存多个dom元素到数组中,如果ref属性在组件上,则可拿到组件的vue的实例
		     	所有通过v-on绑定事件都放在$listeners里面,this.$emit('click',msg);//msg是传递的参数,可以触发自定义事件
				const vm=new Vue({
						el:'#app',
						provide:{
							content:'我是内容,我是内容,我是内容我是内容我是内容',
							title:'我是标题'
						},
						methods:{
								func(data){
									console.log(data);
								}
						},
						mounted(){
							console.log(this.$refs.dom);//拿到绑定ref属性的元素,当有多个带有ref属性的元素,只会拿到一个,如果是通过for循环生成的元素,可以全部拿到,ref在子组件上,就可以拿到子组件的实例
						},
						components:{
							myContent:{
								inheritAttrs:false,//没有被注册的属性,不会在行间显示
								inject:['title']//可以拿到provide里面的title的数据
								methods:{
									cmpFunc(){
										console.log('cmp');
									},
									handleClick(){
										console.log(this.$listeners);
										this.$listeners.click('$listener的方法');//执行的是父组件的函数
										this.$emit('click','$emit传值给父组件');主动触发事件
									}
								},
								template:'<div>
                                    <h3>
                                        <p @click="handleClick"></p>
                                        <button v-on="$listeners"></button>//这样的方法,只能触发事件,不能传递参数,而且会触发所有通过v-on绑定的事件
                                    </h3>
								</div>' $listeners会把父组件所有的事件绑定在子组件上,不能传递参数呢
							}
						}
					})

###	3:组件兄弟间传递数据;
	 1:event bus事件总线
	 2:vue实例
		  Vue.prototype.bus = new Vue();
            const vm = new Vue({
                el: '#app',
                components: {
                    con: {
                        data() {
                            return {
                                content: 'con1'
                            }
                        },
                        created() {
                            this.bus.$on('click', content => {//监听click事件
                                console.log(content);
                                this.content = content;
                            })
                        }
                        ,
                        template: '<div class="content">{{content}}</div>'
                    },
                    con1: {
                        data() {
                            return {
                                inputValue: ''
                            }
                        },
                        methods: {
                            handleClick() {
                                this.bus.$emit('click', this.inputValue);
                            }
                        },
                        template: '<div class="content">\
                          <input type="text" v-model="inputValue"/>\
                        <button @click="handleClick">提交</button>\
                       </div>'
                    }
                }
            })
### 3:组件双向通信
	1:<my-con :value="count" @input="handleInput" ></my-con>
	2:<my-con v-model="count" ></my-con>(相当于:value+@input)
	3:<my-con :value="count" @update:value="handleInput" ></my-con>
	4:<my-con :value.sync="count" ></my-con> 相当于第三种写法(update+@update:value)的语法糖
	Vue.component('mycon',{
		props:['value'],
		mounted(){
			setinterval(=>{
				let value=this.value+1;
				//this.$emit('input',value);
				this.$emit('update:value',value);
			},1000)
		},
		temp;ate:`<div>{{value}}</div>`
	})
	const vm=new Vue({
		el:'#app',
		methods:{
			handleInput(value){
				this.count=value;
			}
		}
		data:{
			count:300
		}
	})


## 十二:插槽  使用的时候,没有被命名插槽包围的内容都会在默认插槽中显示
```
<my-button type="success" content="成功按钮">自由定义的文字
      默认插槽
	<template v-slot:second></template>//绑定使用命名的插槽,v-slot:简写是一个# #second
     默认插槽
</my-button>
 const vm=new Vue({
	 el:'#app',
	 components:{
		 my-button:{
			 props:['type','content'],
			 template:`<button class="button" :class="type"><slot></slot><slot name="second"></slot></button>`//slot会被编译成"自由定义的文字",替换的是组件中间的区域,默认替换的是没有名字slot有的话则不替换
		 }
	 }
 })
 <template slot-scope="scope">
  <el-button @click="lookVideoInfo(scope.row)" size="mini" type="primary">查看</el-button>
  <el-button size="mini" @click="editVideoInfo(scope.row)" type="success">编辑</el-button>
   <el-button
	v-if="scope.row.isDisabled"
	type="success"
	size="mini"
	@click="enableVideo(scope.row)">
	启用
  </el-button>
  <el-button
	v-if="!scope.row.isDisabled"
	type="danger"
	size="mini"
	@click="disabledVideo(scope.row)"
  >禁用</el-button>
</template>
1.:这里slot-scope就是使用vue的插槽
2.:scope里面存储了两个值,scope.index,scope.row,前者是当前数据的index值,后者是一个对象里面包含了该条数据的所有的信息	
```
## 十三:子组件和父组件传值 prop  
	子组件
	子组件是可以引用自己的(递归效果),引用的时候,需要组件有name属性
	<template>
	  <div class="tag-input">
	    <el-input
	      v-show="inputVisible"
	      ref="saveTagInput"
	      v-model="inputValue"
	      class="input-new-tag"
	      size="small"
	      @keyup.enter.native="handleInputConfirm"
	      @blur="handleInputConfirm"
	    />
	    <el-button v-show="!inputVisible" class="button-new-tag" icon="el-icon-edit" size="small" @click="showInput">{{ content }}</el-button>
	  </div>
	</template>
	  props: {
	  valueObj: {父组件的属性值,父组件中划线命名的属性,在子组件用小驼峰属性接收
	    type: Object,
	    default: () => {
	      return {}
	    }
	  },
	  content: {父组件的属性值,父组件中划线命名的属性,在子组件用小驼峰属性接收
	    type: Number,
	    default: () => {
	      return 0
	    }
	  }
	},
	父组件
	<el-table-column label="排序编号" align="center" prop="sort" sortable>
	  <template slot-scope="scope">
	    <TagInput
	      :value-obj="scope.row"绑定属性,传递属性值给子组件
	      :content="scope.row.sort"绑定属性,传递属性值给子组件
	      @inputConfirm="inputConfirm"/>
	  </template>
	</el-table-column>
	import TagInput from '@/components/TagInput',父组件引入子组件
	components: { TagInput },父组件要注册子组件,
##  十四:路由跳转
####	1:跳转和传递值: this.$router.push({ name: 'lookVideoInfo', query: { relationId: videoInfo.relationId }})
		name是路由定义好的路由名称,query是路由传递的参数
####	2:接收值
		this.$route.query.relationId,//relationId是传递参数的名字,注意:接收参数用的是this.$route,传递参数使用的this.$router
####	3:接收url地址中的参数
		this.$route.query.pageNo//注意此处使用的是this.$route,pageNo是参数的名字
##  十五:脚手架
####	1:命令:
		  npm install -g @vue/cli 安装脚手架,用于生成项目
		  npm install -g @vue/cli-service-global  快速原型开发,编译vue文件,
		  npm uninstall vue-cli g //如果之前安装过旧版本(非3.x)的脚手架,需要先卸载旧版本
		  npm install -g @vue/cli-init ;拉取旧版本 如果仍然需要旧版本的vue init功能,可以全局安装一个桥接工具,
		  vscode 高亮插件 Vetur
####	  2:vue文件
		  <template></template>标签,中间放的是的dom元素
		  <script>
		  export default{
			  //写数据逻辑处理js文件的地方
		  }
		  </sctipt>
		  <style>
		  .demo{color:red}
		  </style>
####		3:启动vue项目
			vue serve App //默认是的app.vue,可以省略app 直接写 vue serve
####		4:在组件中,调用自己组件的名字,必须给组件一个name属性(树形例子)
## 十六:利用脚手架搭建项目
####	1:命令:
#####		1:创建项目;vue create vue-app vue-app是项目的名字,可以自定义
		  创建项目的时候会涉及到很多选择,要注意区分
#####		2:运行服务器 npm run serve
#####		3:在项目的根文件夹下,可以添加vue.config.js作为自己对项目的配置文件(例如webpack的一些配置)
#####    C:\Users\Administrator\.vuerc 文件可修改项目的预设配置,比如默认的安装工具(bebel,eslinke)
####	2:vue ui 可以在线图形化管理界话创建项目
####	3:路由 router
        路由的两种模式:
        哈希模式: 不会刷新页面
        历史模式: 地址栏不出现#号
		添加路由 vue add router 
		linkExactActiveClass: 'active-exact',当前路由包含该路由就渲染的当前样式
		linkActiveClass: 'active',当前路由,完全匹配才渲染的路由样式
		const routes = [
		  mode:'history',//开始历史模式浏览器的导航里面不出现#号
          {
            path: '/',
            name: 'home',
            component: Home
          },
          {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            //这是为了懒加载,加快第一页面的加载速度,当组件被访问的时候才会加载
            component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
          }
        ]
####	4:使用路由器 tag规定router-link用什么标签来渲染,router-view路由连接要显示的区域
		<div id="app">
		<div class="header">
		  <ul class="nav">
					<router-link tag="li" to="/">首页</router-link> |
					<router-link tag="li" to="/learn">课程学习</router-link>|
					<router-link tag="li" to="/student">学员展示</router-link> |
					<router-link tag="li" to="/about">关于</router-link>|
					<router-link tag="li" to="/community">社区</router-link> |
				</ul>
		</div>
		<router-view class="view" />
	  </div>
		注意:页面级组件放在view里面,在页面上引入的其它组件则放在components里面
		{
              path:'/comu',
              name:'comu',
              component: ()=>import('../views/Comu'),
              redirect:'/academic',
              children:[
                {
                  path: '/academic',
                  name: 'academic',
                  component: () => import('../components/comu/Academic')
                },
                {
                  path: '/download',
                  name: 'download',
                  component: () => import('../components/comu/DownLoad')
                },
                {
                  path: '/personal',
                  name: 'personal',
                  component: () => import('../components/comu/Personal')
                },
                {
                    path:'/NotFound',
                    component:()=>import('../components/comu/NotFound')
                },
                {
                    path:'*',
                    redirect(to){
                        console.log(to);获取想要访问的信息
                        if(to.path=='/'){
                          return '/honme'
                        }
                    }
                }
              ]
		注意:redirect:'/community/academic',当进入当前路由的时候,默认展示重定向后路由的信息
####	5:路由操作
		this.$router.push(src);//
		this.$router.push({'name':'home',path:'/home'})
		[a,b,c]->[a,b,c,d]->回退->[a,b,c]->回到到c页面
		this.$router.replace(src);//替换当前页面,如果回退的话,直接回退到上一个页面
		[a,b,c]->[a,b,d]->回退->直接到b页面
		
		this.$router.go(0);0是刷新当前页面,-1向前跳一个页面,1向后跳转一个页面
##  十七:导航守卫(组件内守卫)
####	1:beforeRouteLeave//路由跳转之前
		beforeRouteLeave(to,from ,next){
				//to,要跳转的页面,from 当前页面,next 是否进行跳转 next()执行就跳转,不执行就不跳转
			},
####	2:beforeRouteEnter{//路由进来之前,
     	beforeRouteEnter(to,from,next){
			//to:当前页面, from:来源页面, next:执行就进来了,不执行就不进来,这个时候this是defined
			next(vm=>{});//vm就是vue的实例
	}
####	3:beforeRouteUpdate//这里面不能通过this.$route来获取参数,因为获取的还是之前的参数
		beforeRouteUpdate(to,from,next){
		const id=to.params.id;
		this.getId(id);
	},
####	4:路由地址传递信息
	路由配置设置
		{
			path:'/questioin/:id',
			name:'question',
			component:()=>import('./views/Questions.vue')
		}
		跳转页面静态设置
		<router-link
			:to="{name:'question',params:{id:question.questionId}}"
			tag="li"
		  v-for="question in questionList"
		  :key="question.questionId"
		>
		  {{ question.title }}
		</router-link>
		动态设置: this.$router.push({ name: 'lookVideoInfo', params: { relationId: videoInfo.relationId }})
				this.$router.push({ name: 'lookVideoInfo', query: { relationId: videoInfo.relationId }})
		页面接收
		this.id=this.$route.params.id;//注意这里是$route不是$router
		this.id=this.$route.query.id;//注意这里是$route不是$router
####	5:全局守卫
		在main.js里面,router.beforeEach((to,from,next)=>{
			//无论跳转到那个路由,都会进这个函数,如果没有next()执行就无法跳转
		}),
		beforeResolve(to,from,next);//路由加载完成
		afterEach(to,from,next)//路由加载完成以后
		
####	6:独享守卫,写在路由的配置文件里面
	
		{
			path:'/home',
			name:'home',
			component:Home,
			beforeEnter(to,from,next){//独享守卫,当跳转进home路由的时候触发,如果不next()执行,无法进入
				
			}
		},
		先全局守卫->独享守卫->组件内守卫
#### 全局守卫
- beforeEach 进入所有的路由之前
- beforeResolve 路由内的内容被解析完毕后,执行
- afterEach  路由的内的所有内容都被解析完毕,加载完成

#### 路由独享守卫
- beforeEnter

#### 组件内守卫
- beforeRouteLeave 当离开这个路径时执行
- beforeRouteEnter 
- beforeRouteUpdate mounted
- to from next 


### 进入某一个路径时，执行顺序
- beforeEach -> beforeEnter -> beforeRouteEnter -> beforeResolve -> afterEach 
## 十八路由元信息
    应用场景 在需要登录的才能查看的页面进行去权限校验
#### 1:配置需要使用权限的路由
		{
		path:'/student',
		name:'student',
		component:()=>import('./views/Student.vue'),
		meta:{
			login:true
		}
#### 2:在路由的全局守卫中进行登录校验
		router.beforeEach((to,form,next)=>{
			console.log();
			const needLogin=to.matched.some(item=>item.meta&&item.meta.login);
			if(needLogin){
				const isLogin=document.cookie.includes('login=true');
				if(isLogin){
					next();
				}else{
					const login=window.confirm('该页面需登录,请登陆后操作');
					if(login){
						next('/login');
					}
				}
			}else{
				next();
			}
		});
## 十九vuex状态管理

	命令:vue add vuex
	$store 状态管理对象
### state
	```
	 state: {
	  name:'ss',
		age:'18',
		look:'piaoliang',
		studentlist:[]
	}
	===========================
	this.$sotre.state.xxx 获取state里面的某个属性
	import {mapState} from 'vuex' 导入,mapState对象 
	mapState(['name','age','look');拿到vuex state里面的值 ,返回值是一个对象,正好对应计算属性 如下
		{
			name:function(){},
			age:function(){},
			look:function(){}
		}
	在computed中使用
	computed:{
		...mapState('name','age','look')//三个点...计算符,拼接对象,解构对象
	}
	...mapState({
		storeName:state=>state.name//修改vuex里面name的属性(解决和data里面name属性的冲突)
	})
	```
 ####    2:getters
   ```
   配置
   getters:{//类似于vue里面的计算属性,根据data里面的值得到一个新的值
     person(state){
   		return `姓名:${state.name} 年龄:${state.age}`;
   	},
   	newStudentList(state,getters){//这里传入getters可会获取getters里面的内容,例如 getters.person
   		 return state.studentlist.map(student=>`这是姓名${student.name} 这是年龄:${student.age}`)
   	}
   }
   使用
   this.$store.getters.xxx 获取gettes里面的属性
   import {mapGetters} from 'vuex' 导入mapGetters
    mapGetter(['newStudentList','person']);拿到vuex state里面的值 ,返回值是一个对象,正好对应计算属性
    如下
   	{
		person(){
			return 'xxx'
		},
   		newStudentList:function(state,getters){
			return state.studentlist.map(student=>`这是姓名${student.name} 这是年龄:${student.age} 这是getters:${getters.person})`
		}
   	}
    在computed中使用
   computed:{
   	...mapGetters('name','age','look')//三个点...计算符,拼接对象,解构对象
   }
   ...mapGetters({
		newPerson:'person'//修改vuex里面person的属性(解决和data里面name属性的冲突)
   })
   ```
#### 3:mutations 不能放异步代码
	 在严格模式下,vuex不允许外界修改vuex的state里面的数据,vuex提供了mutations函数,可以在里面声明方法,在外界调用,
#####	 1:第一种方法
	 ```
	 配置:mutations,不能放异步代码
	  mutations: {
	 		changeSudentList(state,{tepObj,name,age}){//第二个参数是传递进来的参数,所以所有的参数都放在第二个参数里面
	 			state.studentlist.push(tepObj);
	 			state.name=name;
	 			state.age=age;
	 		}
	 }
	 调用:
	  this.$store.commit('changeSudentList',{tepObj,name:'11',age:'222'})
	  ```
#####	 2:第二种方法
	```
	 import {mapState,mapGetters,mapMutations} from 'vuex'
	 
	 methods:{
	 	...mapMutations(['changeSudentList']),//注意个state,getters的区别,这是在methods
	 	handleClick(){
	 		const tepObj={
	 			name:this.name,
	 			age:this.age,
	 			look:'漂亮',
	 			key:+new Date()
	 		}
	 		// this.$store.state.studentlist.push(obj);
	 		// this.$store.commit('changeSudentList',{tepObj,name:'11',age:'222'})
	 		this.changeSudentList(tepObj);
	 	}
	 }
```	 
#### 4:Actions 和mutations不同的地方就是可以使用异步代码
#####		1:配置
```
			mutations: {
				changeSudentList(state,{tepObj,name,age}){
					console.log(tepObj);
					state.studentlist.push(tepObj);
					state.name=name;
					state.age=age;
				}
			},
		actions: {
				changeSudentList({commit},payload){//commit是主动触发commit函数,payload是参数
					setTimeout(()=>{
						commit('changeSudentList',payload)//触发的是mutations的changeSudentList方法
					},1000)
				}
		}
```
#####		2:使用:第一种方法
```
		methods:{
			// ...mapMutations(['changeSudentList']),
			handleClick(){
				const tepObj={
					name:this.name,
					age:this.age,
					look:'漂亮',
					key:+new Date()
				}
				// this.$store.state.studentlist.push(obj);
				// this.$store.commit('changeSudentList',{tepObj,name:'11',age:'222'})
				// this.changeSudentList(tepObj);
				 this.$store.dispatch('changeSudentList',{tepObj,name:'11',age:'222'});
			}
		}
```
#####		3:抵用第二种方法
```
		import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
		methods:{
			// ...mapMutations(['changeSudentList']),
			...mapActions(['changeSudentList']),
			handleClick(){
				const tepObj={
					name:this.name,
					age:this.age,
					look:'漂亮',
					key:+new Date()
				}
				// this.$store.state.studentlist.push(obj);
				// this.$store.commit('changeSudentList',{tepObj,name:'11',age:'222'})
				// this.changeSudentList(tepObj);
				// this.$store.dispatch('changeSudentList',{tepObj,name:'11',age:'222'});
				this.changeSudentList({tepObj,name:'11',age:'222'})
			}
		}
```
### 调用muations,actions总结
//this.$store.commit("changeStudentList",{tempObj,name:'重楼'});//严格模式下使用 ,mutations,不引入mapMutations时候使用, 不支持异步
// this.changeStudentList({tempObj,name:'重楼'}); //mutations,引入mapMutations时候使用, 不支持异步
// this.$store.dispatch('changeStudentList',{tempObj,name:'重楼'}); //actions 不引入maoState的时候使用
//this.changeStudentList({tempObj,name:'重楼'});//actions 引入maoState的时候使用
## 二十:module
```
state 会放入到每一个模块下面,getters,mutations,actions会直放到全局里面
import student from './student'
import learn from './learn'
Vue.use(Vuex)
export default new Vuex.Store({
  strict:process.env.NODE_ENV!=='production',
  modules:{
	  student,//两个外部state模快 和index文件见在同一个文件夹下
	  learn
  }
})
```

#### student.js
```
export default{
	state: {
	  name:'ss',
		age:'18',
		look:'piaoliang',
		key:'',
		studentlist:[]
	},
	getters:{//类似于vue里面的计算属性,根据data里面的值得到一个新的值
		  person(state){
				return `姓名:${state.name} 年龄:${state.age}`;
			},
			newStudentList(state,getters){
				 return state.studentlist.map(student=>`这是姓名${student.name} 这是年龄:${student.age} 这是getters:${getters.person}`)
			}
		},
	mutations: {
				changeSudentList(state,{tepObj,name,age}){
					state.studentlist.push(tepObj);
					state.name=name;
					state.age=age;
				}
	},
	actions: {
				changeSudentList({commit},payload){
					setTimeout(()=>{
						commit('changeSudentList',payload)
					},1000)
				}
	}
}
```
#### lean.js
```
export default{
	namespaced:true,
	state:{
		courseName:'js精英课堂',
		price:10
	},
	getters:{
		coursePrice(state){
			return '¥'+state.price;
		}
	},
	mutations:{
		changePrice(state,{price}){
			state.price=price;
		}
	},
	actions:{
		
	}
}
```
### 获取vuex中的数据 无namespaced情况
	```
	获取state:this.$store.state.moduleName.xxx  {{$store.state.courseName}}
	获取getters,mutations,action:
	获取getters:this.$store.getters.xxx   {{$store.getters.coursePrice}}
	获取mutations:this.$store.commit('xxx'); this.$store.commit('changePrice',{price:20})
	获取actions:this.$store.dispatch('xxx'); this.$store.dispatch('changePrice',{price:20}})
	可以通过mapxxx的方可以拿到getters,mutations,action,但是拿不到state,如果想通过这样的方式获取state,需要在添加命名空间
	namespaced:true(在每一个模块的state的文件里面)
	```
### 获取vuex中的数据 有namespaced情况
	```
	获取state:this.$store.state.moduleName.xxx  {{$store.state.learn.courseName}}
	获取getters:this.$store['moduleName/getters'].xxx this.$store['learn/getters'].coursePrice  
	获取mutations:this.$store.commit('moduleName/xxx');  this.$store.commit('learn/changePrice',{price:20})
	获取actions:this.$store.dispatch('moduleName/xxx'); this.$store.dispatch('learn/changePrice',{price:20}})
	可以通过mapXXX:mapXXX('moduleName',['xxx']) 或者mapXXX('moduleName',{})
	
	{{courseName}}
	{{coursePrice}}
	import {mapGetters,mapState} from 'vuex'
	export default{
		methods:{
			handleClick(){
				this.$store.commit('learn/changePrice',{price:20})
			}
		},
		computed: {
			...mapGetters('learn',['coursePrice']),
			...mapState('learn',['courseName'])
		},
	}
	```
### 打包项目 npm run build
打包设置
const path=require('path');
module.exports={
    //设置打包后的文件夹名字,
    outputDir:'dist',

    //设置静态资源文件夹
    assetsDir:'assets',
    // publicPath:process.env.NODE_ENV==='production' ? 'http://www.uguoba.com':'/',//设置公共的资源路径
    //'是否需要打包出sourceMap sourceMap可以为我们js报错找到真实报错信息',
    productionSourceMap:false,
    chainWebpack:config=>{
        config.resolve.alias.set('_v',path.resolve(__dirname,'src/views')) //设置简写的文件夹路径
    },

    configureWebpack:{//此处可以设置webpack的相关配置信息
        // plugin:[],
        // module:[]
    },

    devServer:{//跨域配置
        proxy:{
            '/login':{
                target:'http://www.uguoba.com/login',
                changeOrigin: true,
                pathRewrite:{
                    '^/login':''
                }
            }
        }
    },

    pluginOptions: {
      'style-resources-loader': {//在每一个文件里面都使用到的的公共css
        preProcessor: 'less',
        patterns: [
            path.resolve(__dirname,'src/assets/styles/common.less')
        ]
      }
    }
}

#单元测试
单元测试是对软件中最下小的可测试单元进行检查和验证;
测试工具
    # mocha+chai
    
    - mocha：测试框架
      > vue脚手架内部就安装好了，不需要再次引入
      
      > 自己安装：mocha mocha-webpack
    
    - chai：断言库，断定左边的和右边的是否相等
      > 三种断言风格：should、expect、assert
      
      > www.chaijs.com
    
    ## 用法
    
    - 套件
      > describe('套件名字', () => {})
      - 生命周期
        > before(()=>{}) 调用该套件的所有测试用例之前执行且只执行一次
    
        > after(()=>{}) 调用该套件的所有测试用例之后执行且只执行一次
    
        > beforeEach(()=>{}) 调用该套件的每个测试用例之前执行，有几个测试用例就执行几次
    
        > afterEach(()=>{}) 调用该套件的所有测试用例之后执行，有几个测试用例就执行几次
    
    - 用例
      > it('用例名字', done => {}) 
      - done 
        > done函数被调用的时候，才能完成测试
    
    ### chai的基本用法
    
    * 判断相等
      > 判断基本类型 expect(1).to.be.equal(1); 
    
      > 判断引用类型：expect({a: 1}).to.be.deep.equal({a: 1})   /   expect({a: 1}).to.be.eql({a: 1}) 
    
      > deep标记：该标记可以让其后的断言不是比较对象本身，而是递归比较对象的键值对
    
    * 判断不等
      > expect(2).to.be.not.equal(1);
    
    * 判断大于
      > expect(10).to.be.above(5);
    
      > expect(10).to.be.greaterThan(5);
    
    
    * 判断小于
      > expect(5).to.be.below(10);
    
      > expect(5).to.be.lessThan(10);
    
    * 判断大于等于
      > expect(10).to.be.at.least(10);
    
      > expect(10).to.be.not.lessThan(10);
    
    * 判断小于等于
      > expect(5).to.be.at.most(5);
    
      > expect(5).to.be.not.greaterThan(5);
    
    * 判断长度
      > expect([1, 2, 3]).to.be.lengthOf(3);
    
    * 判断为truthy，(除了false、undefined、null、正负0、NaN、""的值)
      > expect(1).to.be.ok;
    
    * 判断为true、false、null、undefined、NaN
      > expect(true).to.be.true;
    
      > expect(false).to.be.false;
    
      > expect(null).to.be.null;
    
      > expect(undefined).to.be.undefined;
    
      > expect(NaN).to.be.NaN;
    
    * 判断包含
      > expect('shanshan').to.be.include('s'); 包含
    
      > expect('shanshan').to.be.contain('s'); 包含
    
      > expect('shanshan').to.be.match(/s/); 匹配
    # sinon 
    > 辅助我们进行前端测试。
    
    > 安装：npm install sinon -D
    
    > 引入: import sinon from 'sinon';
    
    ## spy 间谍函数
    
    > const spy = sinon.spy();
    
    - 使用方法
      > spy.called; 表示函数是否被调用,返回布尔值
    
      > spy.callCount; 函数被调用的次数
    
      > spy.calledOnce; 函数只被调用了一次，返回布尔值
    
      > spy.calledTwice; 函数被连续调用了两次，返回布尔值
    
      > spy.calledThrice; 函数被连续调用了三次，返回布尔值
    
      > spy.firstCall; 函数第一次被调用。返回布尔值
    
      > spy.secondCall; 函数第二次被调用。返回布尔值
    
      > spy.thirdCall; 函数第三次被调用。返回布尔值
    
      > spy.lastCall; 函数最后一次被调用。返回布尔值
    
      > spy.calledOn('xxx');  调用函数时，函数的this至少有一次是xxx，返回布尔值。
    
      > spy.alwaysCalledOn('xxx');  调用函数时，函数的this始终是xxx，返回布尔值。
    
      > spy.calledWidth(1, 2, 3); 函数至少被调用一次，且参数包含1, 2, 3,返回布尔值。
    
      > spy.calledOnceWith(1, 2, 3); 函数只被调用一次，且参数包含1, 2, 3,返回布尔值。
    
      > spy.alwaysCalledWith(1, 2, 3); 函数被调用时传的参数始终包括1,2,3，返回布尔值。
    
      > spy.calledWithExactly(1, 2, 3); 函数至少被调用一次，且参数只为1,2,3，返回布尔值。
    
      > spy.alwaysCalledWithExactly(1, 2, 3); 函数被调用时传的参数始终只为1,2,3，返回布尔值。
    
      > spy.calledWithNew(); 函数被作为构造函数new,返回布尔值。
    
      > spy.neverCalledWith(1, 2, 3); 函数执行时，参数从不为1, 2, 3。返回布尔值。
    
      > spy.threw(); 函数执行时，抛出一个异常。返回布尔值。
    
      > spy.threw("TypeError"); 函数执行时，至少抛出一次TypeError异常。返回布尔值。
    
      > spy.threw('xxx'); 函数执行时，至少抛出一次xxx异常。返回布尔值。
    
      > spy.alwaysThrew(); 函数执行时，始终抛出异常。返回布尔值。
    
      > spy.alwaysThrew("TypeError"); 函数执行时，始终抛出TypeError异常。返回布尔值。
    
      > spy.alwaysThrew('xxx'); 函数执行时，失踪抛出xxx异常。返回布尔值。
    
      > spy.returned('xxx'); 函数执行时，至少返回一次xxx。返回布尔值。
    
      > spy.alwaysReturned('xxx'); 函数执行时，始终返回'xxx'。返回布尔值。
    
      > spy.getCall(n); 返回函数被第n次调用。
    
      > spy.getCalls(); 返回一个函数被调用的数组。
    
      > spy.thisValues; 返回函数被调用时this指向的集合, 值类型为数组。
    
      > spy.args; 返回函数被调用时参数，值类型为数组。
    
      > spy.exceptions; 返回函数被调用时抛出的异常集合. 值类型为数组。
    
      > spy.returnValues; 返回函数被调用时返回的值，值类型为数组。
           
 # jest
 - 匹配语法
   > https://jestjs.io/docs/zh-Hans/using-matchers
 
 - mock函数
   > https://jestjs.io/docs/zh-Hans/mock-functions


思想升级
for循环的时候,如果有事件,需要对对象进行单独的操作,可以把单个对象放进去
  