'use strict';
/**
 * Provider config
 */


var config = require('../../config/configuration.js');
var box = require('./helpers/box.js');

 
var initAccount = function(req, next) {
  next(null, {code: req.params.code}, box.getConnectUrl());
};

var connectAccountRetrievePreDatasIdentifier = function(req, next) {
  next(null, {'datas.oauth_token': req.params.oauth_token});
};

var connectAccountRetrieveAuthDatas = function(req, preDatas, next) {
  next(null, datas);
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
