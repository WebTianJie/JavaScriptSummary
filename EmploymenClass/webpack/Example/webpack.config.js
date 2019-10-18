var path=require('path');
var glob=require('glob-all');
var {CleanWebpackPlugin}=require('clean-webpack-plugin')//解构出来的名字也要保持一致
var CssMiniExtractPlugin=require('mini-css-extract-plugin');
var HtmlWebpackPlugin=require('html-webpack-plugin');
var WebpackDeepScopeAnalysisPlugin=require('webpack-deep-scope-plugin').default;
var PurifyCssPlugin=require('purifycss-webpack');

module.exports={
	entry:{//多文件打包入口
		index:'./src/index.js',
		app:'./src/app.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'js/[name].js',
		chunkFilename:'js/[name].js' //公共模块
	},
	module:{
		rules:[
			{
				test:/\.less$/,
				// use:['style-loader','css-loader','less-loader']
				//use:[CssMiniExtractPlugin.loader,'css-loader','less-loader']//出去less文编编译后的代码到独立的css文件
				use:[
//					{loader:'style-loader'},
					{loader:CssMiniExtractPlugin.loader},

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
			},
			{
				test:/\.(jpg|png|jpeg|gif)$/,
				use:[
					{loader:'url-loader',//将图片打包出来
						options:{
							name:'[name][hash:5].[ext]',
							limit:1000,//100k(小于100k,采用base64编码)\
							outputPath:'img',
							publicPath:'../img'//图片处理完后,输出的路径
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
							outputPath:'img',
							attrs:['img:src']//处理html中,引入式图片,html编译后会自动关联图片
						}
					}
				]
			}
		]
	},
	plugins:[
		new CssMiniExtractPlugin({//css的抖动,要放在js之前
			filename:'css/style.css'
		}),
		new WebpackDeepScopeAnalysisPlugin(),//深度清理,在声场环境下,剔除掉无用的js文件,或者js文件中无用的js代码
		new HtmlWebpackPlugin({
			filename:'index.html',
			template:'./src/index.html',
			minify:{
				removeComments:true,//清理注释
				collapseWhitespace:false//清除空格
			}
		}),
		new CleanWebpackPlugin(),//清除每次打包生成的重复文件
		new PurifyCssPlugin({
			minimize:false,//开启css代码压缩
			paths: glob.sync([
				path.join(__dirname, './src/*.html'),//html结构里面如果有注释的元素也还是会被匹配到的,无法剔除css样式,src下面所有的html文件都会被影响到
				path.join(__dirname, './src/*.js')]//配置在js里面添加的元素,也需要保留样式,src文件夹下所有的js文件都会被影响到
			)
		})
	],
	optimization:{
		splitChunks:{
			cacheGroups:{
				common:{//打包业务代码,
					test: /\.css$/,
					name:'[name]/style',//模块的名字
					chunks:'all',//什么范围内,寻找公共的js
					minSize:100,//打包后的体积
					minChunks:2,//当前的公共模块出现的最少次数
					priority:1 ,//优先级,越大优先级越高
					enforce:true
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