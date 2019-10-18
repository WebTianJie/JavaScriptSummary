var path=require('path')
var glob=require('glob-all')//全局匹配
var CssMiniExtractPlugin=require('mini-css-extract-plugin')
var PurifyCssPlugin=require('purifycss-webpack')
module.exports={
	entry:{
		index:'./src/index.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'main.js'
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				//use:['style-loader','css-loader']根下面插件冲突
				use:[CssMiniExtractPlugin.loader,'css-loader']
			}
		]
	},
	plugins:[
		new CssMiniExtractPlugin({//css的抖动,要放在js之前
			filename:'[name].css'
		}),
		new PurifyCssPlugin({
	      paths: glob.sync([
	      	path.join(__dirname, './src/*.html'),//html结构里面如果有注释的元素也还是会被匹配到的,无法剔除css样式
	      	path.join(__dirname, './src/*.js')]//配置在js里面添加的元素,也需要保留样式
	      )
	    })
	],
	mode:'development'
}
