const path = require('path')

const  resolve =(dir) => {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    name: '11111',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
}