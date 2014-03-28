var _      = require('underscore');
var config = require('./config');
var io     = require('socket.io').listen(config.socket_io.port);
var redis  = require('redis');


if(process.env.REDISTOGO_URL) {
  var rtg    = require('url').parse(process.env.REDISTOGO_URL)
  var client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth);
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
