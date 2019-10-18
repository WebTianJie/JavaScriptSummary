<template>
	<div>
		<Calender></Calender>
		<Tree :treeData="treeData"></Tree>
	</div>
</template>

<script>
	import Calender from './Calender'
	import Tree from './Tree'
	export default{
		data(){
			return {
					name:'欢迎来到VUE',
					treeData:  [
					  {
						name: '一级 1',
						children: [
						  { 
							name: '二级 1-1', 
							children: [ 
							  { 
								name: '三级 1-1-1',
								children: [
								  {
									name: '四级 1-1-1-1'
								  }
								]
							  }
							]
						  }
						]
					  },
					  {
						name: '一级 2',
						children: [
						  { 
							name: '二级 2-1',
							children: [
							  {
								name: '三级 2-1-1'
							  }
							]
						  },{
							name: '二级 2-2',
							children: [
							  {
								name: '三级 2-2-1',
							  }
							]
						  }
						]
					  },
					  {
						name: '一级 3',
						children: [
						  {
							name: '二级 3-1',
							children: [
							  {
								name: '三级 3-1-1'
							  }
							]
						  },
						  {
							name: '二级 3-2',
							children: [
							  {
								name: '三级 3-1-1'
							  }
							]
						  }
						]
					  }
					]
			}
		},
		components:{
			Calender,
			Tree
		}
	}
</script>

<style>
</style>
