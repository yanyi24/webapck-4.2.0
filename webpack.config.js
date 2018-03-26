const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
	//entry: ['./src/a.js','./src/b.js'] //通用，多入口到单一出口
	entry: {
		a: './src/a.js',
		b: './src/b.js'  

	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name]-bundle.js'
	},
	plugins:[
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'templete A',
			filename: 'a.html',
			template: './src/templetes/tpla.html'
		}),
		new HtmlWebpackPlugin({
			title: 'templete B',
			filename: 'b.html',
			template: './src/templetes/tplb.html'
		}),
	]
}