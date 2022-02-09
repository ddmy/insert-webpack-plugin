<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>Insert Webpack Plugin</h1>
  <p>对webpack打包后的文件再次进行额外的操作</p>
</div>

<h2 align="center">安装</h2>
<h3>Webpack 4</h3>

```bash
npm i insert-webpack-plugin
```

<h2 align="center">Usage</h2>

**webpack.config.js**
```js
const InsertPlugin = require('insert-webpack-plugin')

module.exports = {
  plugins: [
    new InsertPlugin({
      type: /.*\.js/,
      inner: ['/* Author xxx */\n', '/* time: 2022/2/9 */\n']
    })
  ]
}
```

<h2 align="center">选项</h2>

|参数名|类型|默认值|描述|
|:--:|:--:|:-----:|:----------|
`type`|{String\|RegExp}| /.*/ |要处理的文件范围
`inner`|Array|[]|要插入文件头部的内容(目前仅支持在头部插入)

<h2 align="center">待实现</h2>
- 文件不同位置插入
- 不同文件插入不同内容