var path=require('path')
var HtmlWebpackPlugin=require('html-webpack-plugin');
var CleanWebpackPlugin=require('clean-webpack-plugin');
module.exports={
	entry:{
		index:'./src/index.js'
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:[
					{loader:'style-loader'},
					{loader:'css-loader'}
				]
			},
			{
				test:/\.html$/,
				use:[
					{loader:'html-loader',
						options:{
							attrs:['img:src']
						}
					}
				]
			}
		]
	},
	plugins:[
	    new HtmlWebpackPlugin({
			filename:'[name].html',
	    	template:'./src/index.html',
	    	minify:{
	    		removeComments:true,//去掉注释
	    		collapseWhitespace:true//去掉空格
	    	}
	    }),
		new CleanWebpackPlugin()
	]
}
