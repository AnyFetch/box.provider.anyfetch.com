'use strict';
/*
 * Functions to work with Box API
 * http://developers.box.com/
 */

var request = require('request');

var config = require('../../../config/configuration.js');

module.exports.getConnectUrl = function() {
  return 'https://www.box.com/api/oauth2/authorize?response_type=code&client_id=' + config.box_id;
};

module.exports.getAuthorizationToken = function(authorizationCode, cb) {
  var params = {
    url: 'https://www.box.com/api/oauth2/token',
    form: {
      'grant_type': 'authorization_code',
      'code': authorizationCode,
      'client_id': config.box_id,
      'client_secret': config.box_secret,
    }
  };

  request.post(params, function(err, res) {
    if(err) {
      return cb(err);
    }

    if(!res.body.refresh_token) {
      return cb(new Error("No refresh token in Box.com reply" + res.body));
    }

    cb(null, res.body.refresh_token);
  });
};
