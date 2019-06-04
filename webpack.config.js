const path=require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
	// 入口，出口
	mode: 'development',
	entry: path.join(__dirname,'src/index.js'),
	output: {
		filename:devMode ? '[name].js' : '[name].[hash].js',
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
			// {
			// 	test: /\.css$/,
			// 	use: [
			// 	'vue-style-loader',
			// 	'css-loader'
			// 	]
			// },
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
				 devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
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
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
     	 	filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
    ],
    // 调试可以显示源代码，而不是编译后的
    devtool: 'inline-source-map',
    devServer: {
    	contentBase: './dist',
    	// 热加载
    	hot: true
	},
	optimization: {
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            vendors: {
                filename: `js/chunk-vendors.[contenthash].js`,
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                chunks: 'initial'
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        }
    }
}