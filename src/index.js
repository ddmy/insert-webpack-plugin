function InsertPlugin(options) {
  this.pushArr = options.inner || []
  this.type = options.type || /.*/
  // before after function (source) {}
  this.insertPosition = options.insertPosition || 'before'
}

InsertPlugin.prototype.computedSource = function (assets, filename) {
  if (typeof assets[filename].source === 'function') {
    let source = assets[filename].source()
    let size = assets[filename].size()
    if (this.insertPosition === 'before') {
      source = this.pushArr.join('') + source
      size = this.pushArr.join('').length + size
    } else if (this.insertPosition === 'after') {
      source = source + this.pushArr.join('')
      size = this.pushArr.join('').length + size
    } else if (typeof this.insertPosition === 'function') {
      source = this.insertPosition(source)
      size = source.length
    }
    assets[filename].source = () => source
    assets[filename].size = () => size
  } else if (assets[filename]._source && assets[filename]._source.children) {
    if (this.insertPosition === 'before') {
      assets[filename]._source.children = this.pushArr.concat(assets[filename]._source.children)
    } else if (this.insertPosition === 'after') {
      assets[filename]._source.children = assets[filename]._source.children.concat(this.pushArr)
    } else if (typeof this.insertPosition === 'function') {
      assets[filename]._source.children = this.insertPosition(assets[filename]._source.children)
    }
  }
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
        this.computedSource(compilation.assets, filename)
      }
    }
    callback()
  })
}

module.exports = InsertPlugin;
