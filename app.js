"use strict";

// Load configuration and initialize server
var cluestrProvider = require('cluestr-provider');
var serverConfig = require('./lib/provider-box');


var server = cluestrProvider.createServer(serverConfig);

var initialSync = require('./lib/provider-box/helpers/box/initial');
server.get('/d', function(req, res, next) {
  initialSync('Xi6PhV1soyag4iuSyIYXsPAtwuKDoXRC', function(err, tasks) {
  });

  res.send('OK');
  next();
});


// Expose the server
module.exports = server;
