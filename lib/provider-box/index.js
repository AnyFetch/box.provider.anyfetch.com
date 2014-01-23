'use strict';
/**
 * Provider config
 */


var config = require('../../config/configuration.js');
var box = require('./helpers/box/');
var initialSync = require('./helpers/box/initial');
var updateSync = require('./helpers/box/update');
var uploadFile = require('./helpers/upload');

 
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

  box.getTokens(req.params.code, function(err, tokens) {
    next(err, tokens);
  });
};

var updateAccount = function(tokens, cursor, next, updateDatas) {
  box.getNewTokens(tokens.refresh_token, function(err, tokens) {
    if(err) {
      console.log(err);
      return next(err);
    }

    updateDatas(tokens, function(err) {
      if(err) {
        return next(err);
      }

      if(!cursor) {
        // First run: poll recursively all folders
        initialSync(tokens.access_token, next);
      }
      else {
        // Retrieve all files since last call
        updateSync(tokens.access_token, cursor, next);
      }
    });
  });
};

module.exports = {
  initAccount: initAccount,
  connectAccountRetrievePreDatasIdentifier: connectAccountRetrievePreDatasIdentifier,
  connectAccountRetrieveAuthDatas: connectAccountRetrieveAuthDatas,
  updateAccount: updateAccount,
  queueWorker: uploadFile,

  anyfetchAppId: config.anyfetch_id,
  anyfetchAppSecret: config.anyfetch_secret,
  connectUrl: config.box_connect,
  concurrency: config.max_concurrency
};
