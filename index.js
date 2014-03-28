var _      = require('underscore');
var io     = require('socket.io').listen(8080);
var redis  = require('redis');
var config = require('./config');

var client = redis.createClient(config.redis.port, config.redis.host);

var publish = _.throttle(function(survey_id, answers) {
  io.sockets.in(survey_id).emit('answers', answers);
}, 100);

client.on('ready', function() {
  client.subscribe('survey_channel');

  client.on('message', function(channel, message) {
    var object = JSON.parse(message);
    publish(object.survey_id, object.answers);
  });
});

io.sockets.on('connection', function (socket) {
  socket.on('subscribe', function(survey) {
    socket.join(survey);
  });
});
