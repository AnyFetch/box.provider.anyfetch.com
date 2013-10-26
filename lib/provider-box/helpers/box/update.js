'use strict';
// Handle update sync with Cluestr

var box = require('../box');

module.export = function(accessToken, cursor, next) {
  var taks =[];
  var availableActions = [ 
    "ITEM_CREATE", 
    "ITEM_UPLOAD", 
    "COMMENT_CREATE",
    "ITEM_COPY",
    "ITEM_TRASH",
    "ITEM_UNDELETE_VIA_TRASH",
    "ITEM_RENAME"
    ];

  var updateDate = new Date()
  box.updateAccount(accessToken, cursor, next, function(err, res) {

    if(err) {
      console.log("Err: ", err);
      return;
    }


  });

  next(null, tasks, new Date());
};
