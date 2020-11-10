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
			// TODO: бабелизировать
			/*
			{
				test: /\.tsx?$/,
				use: {
					loader: 'ts-loader',
					options: {
						appendTsSuffixTo: [/\.vue$/]
					}
				},
			},
		  */
		],
	},
	plugins: [
		/*
		new HtmlWebpackPlugin({
			title: 'Popup',
			filename: 'popup.html',
			templateParameters: {
				tags: {
					headTags: [],
					bodyTags: []
				}
			}
		}),
		*/
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
