function InsertPlugin(options) {
  this.pushArr = options.inner || []
  this.type = options.type || /.*/
}

InsertPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', (compilation, callback) => {
    // 在生成文件中，创建一个头部字符串
    // 遍历所有编译过的资源文件，
    // 对于每个文件名称，都添加一行内容。
    const type = typeof this.type
    for (var filename in compilation.assets) {
      // 处理文件范围判断
      if ((type === 'object' && this.type.test(filename)) || (type === 'string' && filename === type)) {
        if (typeof compilation.assets[filename].source === 'function') {
          const source = this.pushArr.join(',') + compilation.assets[filename].source()
          const size = this.pushArr.join(',').length + compilation.assets[filename].size()
          compilation.assets[filename].source = () => source
          compilation.assets[filename].size = () => size
        } else if (compilation.assets[filename]._source && compilation.assets[filename]._source.children){
          compilation.assets[filename]._source.children = this.pushArr.concat(compilation.assets[filename]._source.children)
        }
      }
    }
    callback()
  })
}

module.exports = InsertPlugin;
