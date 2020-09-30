const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
	lintOnSave: false,
	publicPath: './',
	productionSourceMap: false,

	chainWebpack: config => {
		// 设置快捷路径， @ 表示 'src' ，components 表示 'src/components'
		config.resolve.alias
			.set('@', resolve('src'))
			.set('assets', resolve('src/assets'))
			.set('components', resolve('src/components'))
			.set('views', resolve('src/views'))
			.set('network', resolve('src/network'))
			.set('common', resolve('src/common'))
	},

	//跨域


	devServer: {
		proxy: {
			'/Api': {
				target: 'https://cli.im/Api', // 源地址
				ws: true, //代理websockets,配置这个参数
				//secure: false, //如果接口是https,需要配置此参数
				changeOrigin: true, // 改变源 是否跨域
				pathRewrite: {
					'^/Api': '/'
				}
			}
		}
	},

}
