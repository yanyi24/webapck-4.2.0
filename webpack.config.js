const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const headerHtml = require('./src/assets/js/header');
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
	// devServer: {
	// 	contentBase: path.resolve(__dirname, 'dist'),
	// 	host: 'localhost',
	// 	port: 8765,
	//  hot: true,
	// 	open: true
	// },
	plugins:[
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
	]
}