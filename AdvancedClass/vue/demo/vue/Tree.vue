<template>
		<ul class="tree">
			<li class="tree-li"  v-for="(item,index) in treeData" :key="item.name" :class="{'scope':item.children,'active':showChildren[index]}"><span @click="handleClick(index)">{{item.name}}</span>
				<!-- <ul v-if="showChildren[index]">
					<li :class="{'scope':item.children}" class="tree-li" v-for="(item,index) in item.children">{{item.name}}</li>
				</ul> -->
				<tree v-if="alreadyShow[index]" v-show="showChildren[index]" :treeData="item.children"></tree><!-- //在自己的组件中使用自己必须给组件有name属性 -->
			</li>
			
		</ul>
</template>

<script>
	export default{
		name:'tree',
		data(){
			return {
				showChildren:[],
				alreadyShow:[]
			}
		},
		props:['treeData'],
		methods:{
			handleClick(index){
				this.showChildren.splice(index,1,!this.showChildren[index]);
				if(!this.alreadyShow[index]){
					this.alreadyShow.splice(index,1,true);
				}
			}
		}
	}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

@font-face {
  font-family: 'iconfont';
  src: url('static/iconfont.eot');
  src: url('static/iconfont.eot?#iefix') format('embedded-opentype'),
        url('static/iconfont.woff2') format('woff2'),
        url('static/iconfont.woff') format('woff'),
        url('static/iconfont.ttf') format('truetype'),
        url('static/iconfont.svg#iconfont') format('svg');
}

.tree-li {
  font-size: 14px;
  margin-left: 30px;
  cursor: pointer; 
}

.scope::before {
  display: inline-block;
  content: '\e65a';
  font-family: 'iconfont';
}

.active::before {
  transform: rotateZ(-90deg);
}
</style>
