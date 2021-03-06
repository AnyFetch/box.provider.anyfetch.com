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
module.exports.getTokens = function(authorizationCode, cb) {
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
    
    console.log(res.body);

    if(!body.refresh_token) {
      return cb(new Error("No refresh token in Box.com reply" + res.body));
    }

    cb(null, body);
  });
};


/**
 * Retrieve a new tokens set.
 */
module.exports.getNewTokens = function(refreshToken, cb) {
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

    if(!body.refresh_token) {
      return cb(new Error("No new refresh token in Box.com reply" + res.body));
    }

    cb(null, body);
  });
};


/**
 * List the content of a folder
 */
module.exports.listFolder = function(folderId, accessToken, cb) {
  var params = {
    url: 'https://api.box.com/2.0/folders/' + folderId + '/items',
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

    try {
      var body = JSON.parse(res.body);
    }
    catch(e) {
      console.log(res.body);
      return cb(e);
    }

    cb(null, body.entries);
  });
};


/**
 * List event after the last call
 */
module.exports.getUpdate = function(cursor, accessToken, cb) {
  var params = {
    url: 'https://api.box.com/2.0/events/events',
    qs: {
      'stream_position' : cursor,
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

module.exports.downloadFile = function(fileId, accessToken, cb) {
  var params = {
    url: 'https://api.box.com/2.0/files/' + fileId + '/content',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
    encoding: null
  };

  request.get(params, function(err, res) {
    cb(err, res.body);
  });
};
