const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); 
const headerHtml = require('./src/assets/js/headerHTML');
module.exports = {
	entry: ['./src/assets/js/a.js','./src/assets/js/b.js'],//多入口到单一出口
	// entry: {
	// 	a: './src/assets/js/a.js',
	// 	b: './src/assets/js/b.js'  

	// },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/bundle-[hash].js'
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		host: 'localhost',
		port: 8765,
	 hot: true,
		open: true
	},
	module: {
		rules: [
			// { //使用这个就加载不了公共头部，咋整
			// 	test: /\.(html)$/,
			// 	use: [{
			// 		loader: 'html-loader',
			// 		// options: {
			// 		// 	minimize: false,
			// 		// 	removeComments: false,
			// 		// 	collapseWhitespace: true
			// 		// }
			// 	}]
			// },
			{
				test: /\.css$/,
				// use: ['style-loader', 'css-loader']
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader'],
					publicPath: '../' //解决背景图路径问题
				})
			},
			{
				test: /\.less$/,
				// use: ['style-loader','css-loader','less-loader'],
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader','less-loader'],
					publicPath: '../' //解决背景图路径问题
				})
			},
			{
				test: /\.(pne?g|jpg|gif|svg)/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 1000,
						name: 'images/[name]-[hash:4].[ext]',
						// outputpath: 'images' //图片打包后的路径,不能用，咋整
					}
				}]
			}
		]
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin(), // 启用热更新
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'templete A',
			filename: 'a.html',
			template: './src/a.html',
			// chunks: ['b'], //当为单出口时，这个没什么意义
			files:{
				css: ['main.css','a.css'],
				header: headerHtml
			},
			// minify: true //当模板中使用ejs时，有这个参数时打包不成功
		}),
		new HtmlWebpackPlugin({
			title: 'templete B',
			filename: 'b.html',
			template: './src/b.html',
		}),
		new ExtractTextPlugin('./css/index.css')
	]
}