module.exports = {
  development: {
    redis: {
      host: '127.0.0.1',
      port: '6379'
    }
  },
  production: {
    redis: {
      host: process.env['REDISTOGO_URL'],
      port: process.env['REDISTOGO_PORT']
    }
  }
}[process.env['NODE_ENV'] || 'development'];
