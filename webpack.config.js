const path = require('path');
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
}