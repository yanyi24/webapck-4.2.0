const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const headerHtml = require('./src/assets/js/header');
module.exports = {
	entry: ['./src/assets/js/a.js','./src/assets/js/b.js'],//通用，多入口到单一出口
	// entry: {
	// 	a: './src/assets/js/a.js',
	// 	b: './src/assets/js/b.js'  

	// },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle-[hash].js'
	},
	plugins:[
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'templete A',
			filename: 'a.html',
			template: './src/a.html',
			chunks: ['b'],
			files:{
				css: ['main.css','a.css'],
				header: headerHtml
			},
		}),
		new HtmlWebpackPlugin({
			title: 'templete B',
			filename: 'b.html',
			template: './src/b.html',
		}),
	]
}