const path=require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
	// 入口，出口
	mode: 'development',
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
				test: /\.jsx$/,
				loader: 'babel-loader'
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
				// 可能是styl，也可能是stylus（在style里面写的lang="stylus"）
				test: /\.styl(us)?$/,
				use: [
				'vue-style-loader',
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						sourceMap: true
					}
				},
				'stylus-loader'
				]
			}
		]
	},
	plugins: [
    	new VueLoaderPlugin(),
    	new HtmlWebpackPlugin({
    		title: 'TODOLIST'
		}),
		new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    // 调试可以显示源代码，而不是编译后的
    devtool: 'inline-source-map',
    devServer: {
    	contentBase: './dist',
    	// 热加载
    	hot: true
	}
}