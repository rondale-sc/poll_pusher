var _      = require('underscore');
var config = require('./config');
var redis  = require('redis');
var io     = require('socket.io').listen(config.socket_io.port);


if(process.env.REDISTOGO_URL) {
  var client = require('redis-url').connect(process.env.REDISTOGO_URL);
} else {
  var client = redis.createClient();
}

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
