const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 有些文档直接从包获取插件报is not a constructor错，应该用这种方式引入


const config = {
  mode: "development",
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",//file-loader可以将图片（文件）打包到文件夹下，url-loader可以将文件打包到引用的js文件中（base64）
            options: {
              name: "[name]_[hash].[ext]",//按照原文件名保存
              outputPath: 'images/',
              limit: 20480 // 如果大于20kb就打包成一个文件，小于20kb打包到文件中
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2, // 无论是js里面引入的sass文件还是在sass文件又@import方式引入sass文件都要从postcss-loader开始执行
              modules: true
            }
          },
          "sass-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new CleanWebpackPlugin(),
  ]
};

module.exports = config;
