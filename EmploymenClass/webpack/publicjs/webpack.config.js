var path=require('path');


module.exports={
	entry:{
		pageA:'./src/pageA.js',
		pageB:'./src/pageB.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'[name].bundle.js',
		chunkFilename:'[name].js' //公共模块
	},
	optimization:{
		splitChunks:{
			cacheGroups:{
				common:{//打包业务代码,
					name:'common',//模块的名字
					chunks:'all',//什么范围内,寻找公共的js
					minSize:1,//打包后的体积
					minChunks:2,//当前的公共模块出现的最少次数
					priority:1 //优先级,越大优先级越高
				},
				vendor:{//打包第三方库
					name:'vender',
					test:/[\\/]node_modules[\\/]/,
					chunks:'all',
					priority:10 //优先级,越大优先级越高
				}
				
				
			}
		}
	},
	mode:'development'
}
