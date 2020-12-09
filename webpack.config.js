const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = (env, arg) => ({
	entry: {
		background: path.resolve(__dirname, 'src/background/index.js'),
		content: path.resolve(__dirname, 'src/content/index.js'),
	},
	mode: arg && arg.mode || 'development',
	resolve: {
		extensions: ['.js',],
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
		],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'assets'),
					to: 'assets'
				},
				{
					from: path.resolve(__dirname, 'src/manifest.json')
				}
			]
		})
	]
});
