var path=require('path');
var  MiniCssExtractPlugin=require('mini-css-extract-plugin');
var  HtmlWebpackPlugin=require('html-webpack-plugin');
var  CleanWebpackPlugin=require('clean-webpack-plugin');
module.exports={
	entry:{
		index:'./src/index.js',
        app:'./src/index.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'[name].bundle.js'
	},
	module:{
		rules:[
//			{
//				test: /\.css$/,
//				use:[
////					{loader:'style-loader'},
//					{loader:MiniCssExtractPlugin.loader},
//					{loader:'css-loader'}
//				]
//			}
{
				test: /\.less/,
				use:[
//					{loader:'style-loader'},
					{loader:MiniCssExtractPlugin.loader},
					
					{loader:'css-loader'},
					{loader:'postcss-loader',
						options:{
							ident:'postcss',
							plugins:[
								// require('postcss-cssnext')(),//已经包含了添加前缀的功能
								require('autoprefixer')(),//自动添加前缀,浏览器不兼容的样式
								require('cssnano')() //css压缩
							]
						}
					},
					{loader:'less-loader'}
				]
			}
		]
	},
	plugins:[
	   new  MiniCssExtractPlugin({
	   			filename:'[name].css'
	   }),
	   new HtmlWebpackPlugin({
	   	        filename:'index.html',
	   	        template:'./src/index.html',
	   	        minify:{
	   	        	//清理注释
	   	        	removeComments:true,
	   	        	collapseWhitespace:true//清除空格
	   	        }
	   }),
	   new CleanWebpackPlugin()
	],
	mode:'development'
	
}
