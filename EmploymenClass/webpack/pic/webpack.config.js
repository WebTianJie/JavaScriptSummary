var path=require('path');
var CleanWebpackPlugin=require('clean-webpack-plugin')
var HtmlWebpackPlgin=require('html-webpack-plugin');
var webpack=require('webpack')
module.exports={
	entry:{
		index:'./src/index.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'[name].bundle.js'
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
				test:/\.(jpg|png|jpeg|gif)$/,
				use:[
					{loader:'url-loader',//将图片打包出来
						options:{
							name:'[name][hash:5].[ext]',
							limit:100000,//100k(小于100k,采用base64编码)
							outputPath:'img'//图片处理完后,输出的路径
						}
					},
					{loader:'img-loader',
						options:{
							plugins:[
								require('imagemin-mozjpeg')({
				                 quality:[0.3,0.5] //最小压缩,0.3 ,最大压缩0.5
				                })
							]
						}
					},
				]
		},
		{
				test:/\.html$/,
				use:[
					{loader:'html-loader',
						options:{
							attrs:['img:src']//处理html中,引入式图片,html编译后会自动关联图片
						}
					}
				]
			}
		]
	},
	plugins:[
	 new CleanWebpackPlugin(),
	 new HtmlWebpackPlgin({
	 	template:'./src/index.html'
	 }),
	 new webpack.HotModuleReplacementPlugin()//热更新
	],
	devServer:{
		port:'9090',
		contentBase:'dist',//默认打开路径
		hot:true//开启热更新,部分更新
	},
	mode:'development'
}
