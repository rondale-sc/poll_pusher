module.exports = {
  development: {
    socket_io: {
      port: 8080
    },
    redis: {
      host: '127.0.0.1',
      port: '6379'
    }
  },
  production: {
    socket_io: {
      port: 80
    },
    redis: {
      host: process.env['REDISTOGO_URL'],
      port: process.env['REDISTOGO_PORT']
    }
  }
}[process.env['NODE_ENV'] || 'development'];
