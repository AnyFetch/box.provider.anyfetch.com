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

module.exports.authorize = function() {
  var params = {
    url: 'https://www.box.com/api/oauth2/authorize',
    qs: {
      'response_type': 'code',
    }
  };

  request(params);
};
