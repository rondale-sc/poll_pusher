module.exports = {
  development: {
    socket_io: {
      port: 8080
    }
  },
  production: {
    socket_io: {
      port: 80
    }
  }
}[process.env['NODE_ENV'] || 'development'];
