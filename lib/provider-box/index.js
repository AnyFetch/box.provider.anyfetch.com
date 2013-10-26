'use strict';
/**
 * Provider config
 */


var config = require('../../config/configuration.js');
var box = require('./helpers/box/');

 
var initAccount = function(req, next) {
  var boxUrl = box.getConnectUrl();
  boxUrl = boxUrl + '&state=' + req.params.code;
  next(null, {code: req.params.code}, boxUrl);
};

var connectAccountRetrievePreDatasIdentifier = function(req, next) {
  if(!req.params.state) {
    return next("State parameter left out of query.");
  }

  next(null, {'datas.code': req.params.state});
};

var connectAccountRetrieveAuthDatas = function(req, preDatas, next) {
  if(!req.params.code) {
    return next("Code parameter left out of query.");
  }

  box.getRefreshToken(req.params.code, function(err, refreshToken) {
    console.log(refreshToken);
    next(err, refreshToken);
  });
};

var updateAccount = function(oauthToken, cursor, next) {
  // Retrieve all files since last call
  retrieveFiles(oauthToken, cursor, next);
};

module.exports = {
  initAccount: initAccount,
  connectAccountRetrievePreDatasIdentifier: connectAccountRetrievePreDatasIdentifier,
  connectAccountRetrieveAuthDatas: connectAccountRetrieveAuthDatas,
  updateAccount: updateAccount,
  queueWorker: function() {},

  cluestrAppId: config.cluestr_id,
  cluestrAppSecret: config.cluestr_secret,
  connectUrl: config.box_connect,
  concurrency: config.max_concurrency
};
