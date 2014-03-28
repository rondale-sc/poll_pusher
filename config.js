module.exports = {
  development: {
    socket_io: {
      port: 8080
    }
  },
  production: {
    socket_io: {
      port: process.env.PORT
    }
  }
}[process.env['NODE_ENV'] || 'development'];
