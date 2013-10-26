'use strict';
/*
 * Functions to work with Box API
 * http://developers.box.com/
 */

var request = require('request');

var config = require('../../../../config/configuration.js');


/**
 * Retrieve url to connect a new user to Box
 */
module.exports.getConnectUrl = function() {
  return 'https://www.box.com/api/oauth2/authorize?response_type=code&client_id=' + config.box_id;
};


/**
 * Trade authorization grant for a refresh token
 */
module.exports.getRefreshToken = function(authorizationCode, cb) {
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

    var body = JSON.parse(res.body);

    if(!body.refresh_token) {
      return cb(new Error("No refresh token in Box.com reply" + res.body));
    }

    cb(null, body.refresh_token);
  });
};


/**
 * Retrieve a new access token.
 */
module.exports.getAccessToken = function(refreshToken, cb) {
  var params = {
    url: 'https://www.box.com/api/oauth2/token',
    form: {
      'grant_type': 'refresh_token',
      'refresh_token': refreshToken,
      'client_id': config.box_id,
      'client_secret': config.box_secret,
    }
  };

  request.post(params, function(err, res) {
    if(err) {
      return cb(err);
    }

    var body = JSON.parse(res.body);

    if(!body.access_token) {
      return cb(new Error("No access token in Box.com reply" + res.body));
    }

    cb(null, body.access_token);
  });
};


/**
 * List the content of a folder
 */
module.exports.listFolder = function(folderId, accessToken, cb) {
  var params = {
    url: 'https://www.box.com/api/folders/' + folderId + '/items',
    qs: {
      limit: 1000,
    },
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
  };

  request.get(params, function(err, res) {
    if(err) {
      return cb(err);
    }

    var body = JSON.parse(res.body);

    return body.entries;
  });
};
