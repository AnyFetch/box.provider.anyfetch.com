'use strict';
/**
 * Provider config
 */


var config = require('../../config/configuration.js');
var retrieveFiles = require('./helpers/retrieve.js').delta;
var uploadFile = require('./helpers/upload.js');

 
var initAccount = function(req, next) {
  next(null, requestToken, url);
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

var queueWorker = uploadFile;

module.exports = {
  initAccount: initAccount,
  connectAccountRetrievePreDatasIdentifier: connectAccountRetrievePreDatasIdentifier,
  connectAccountRetrieveAuthDatas: connectAccountRetrieveAuthDatas,
  updateAccount: updateAccount,
  queueWorker: queueWorker,

  cluestrAppId: config.cluestr_id,
  cluestrAppSecret: config.cluestr_secret,
  connectUrl: config.box_connect,
  concurrency: config.max_concurrency
};
