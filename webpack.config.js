const path=require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');

module.exports = {
	// 入口，出口
	target: 'web',
	entry: path.join(__dirname,'src/index.js'),
	output: {
		filename:'bundle.js',
		path:path.join(__dirname,'dist')
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.css$/,
				use: [
				'vue-style-loader',
				'css-loader'
				]
			},
			{
				test: /\.(gif|jpg|jpeg|png|svg)$/,
				use: [
				  {
					loader: 'url-loader',
					options: {
						limit: 1024,
						name: '[name]-aaa.[ext]'
					}					
				  }
				]
			},
			{
				test: /\.styl$/,
				use: [
				'vue-style-loader',
				'css-loader',
				'stylus-loader'
				]
			}
		]
	},
	mode: 'development',
	plugins: [
    	new VueLoaderPlugin(),
    	new HtmlWebpackPlugin({
    		title: 'Output Management'
		}),
		new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    // 调试可以显示源代码，而不是编译后的
    devtool: 'inline-source-map',
    devServer: {
    	contentBase: './dist',
    	hot: true
	}
}