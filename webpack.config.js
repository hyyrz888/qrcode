const {
  resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//css单独分离
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack');
//每次打包后的缓存文件进行删除确保每次都是最新的
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

//设置环境变量
process.env.NODE_ENV = 'development'

console.log(this.mode)
module.exports = {
  entry: {
    //首页
    index: ['./src/js/index.js', './src/index.html'],
    product: ['./src/js/product.js', './src/product.html']
  },
  output: {
    path: resolve(__dirname, './dist'),
    filename: this.mode === 'production' ? 'js/[name].[chunkhash].js' : 'js/[hash:10].js' //每次打包hash改变，造成缓存失效 在生产环境才有效（chunkhash,hash,contenthash）
  },
  module: {
    rules: [
      //css
      {
        test: /\.css$/,
        use: [
          //"style-loader",
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            // options: {
            //   modules: {
            //     localIdentName: '[path][name]__[local]--[hash:base64:5]'
            //   }
            // }
          },
          {
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          'less-loader'
        ]
      },
      //图片
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          esModule: false,
          name: "[hash:10].[ext]",
          outputPath: 'images'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      //处理其他资源
      {
        exclude: /\.(html|css|js|less|jpg|png|gif)/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
          outputPath: 'vendor'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "首页",
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      chunks: ['index'],

    }),
    new HtmlWebpackPlugin({
      title: "产品中心",
      template: './src/product.html',
      filename: 'product.html',
      chunks: ['product']
    }),
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: 'css/[contenthash].css', //多文件不同命名  (hash不行)  用contenthash
      chunkFilename: '[id].css',
      ignoreOrder: true,
    }),
    new CleanWebpackPlugin()
    // new webpack.HotModuleReplacementPlugin({
    //   // Options...
    // })
  ],
  mode: 'development',
  externals: {
    //jquery: 'jquery'
  },
  devtool: 'source-map', //调试代码
  //配置测试服务器
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 3000,
    open: false,
    // 除了一些基本启动信息以外，其他内容都不要显示
    //quiet: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }

}
