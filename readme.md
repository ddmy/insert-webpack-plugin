<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>Insert Webpack Plugin</h1>
  <p>对webpack打包后的文件再次进行额外的操作</p>
</div>

<h2 align="center">安装</h2>

>  支持webpack4.x webpack5.x

```bash
npm i insert-webpack-plugin -D
```

<h2 align="center">使用</h2>

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

**自定义插入**

```js
module.exports = {
  plugins: [
    new InsertPlugin({
      type: /.*\.js/,
      insertPosition: source => {
        return source.slice(0, 50) + '\n /* Hello World */ \n' + source.slice(51)
      }
    })
  ]
}
```

<h2 align="center">选项</h2>

|参数名|类型|默认值|描述|
|:--:|:--:|:-----:|:----------|
`type`|{String\|RegExp}| /.*/ |要处理的文件范围
`insertPosition`|{String\|Function}|'before'|要插入的位置 </br> String: 'before'\|'after'</br>Function 接收文件source参数，值为文件内容String,使用此方式,方法必须返回处理后的String,使用Function将会忽略`inner`
`inner`|Array|[]|要插入文件头部的内容(目前仅支持在头部插入)

<h2 align="center">协助</h2>

- 如果您在使用中遇到了任何问题，欢迎提issues