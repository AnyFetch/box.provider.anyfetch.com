'use strict';
// Handle update sync with Cluestr

var box = require('../box');

module.export = function(accessToken, cursor, next) {
  var tasks =[];
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

    console.log(res);
    
    if(err) {
      console.log("Err: ", err);
      return;
    }

    // Set the next point of update
    updateDate = res.next_stream_position;

    // List all folders and push them to the queue
    res.entries.forEach(function(entry) {
      if(availableActions.indexOf(entry.event_type) != -1) {
        if (entry.event_type == "ITEM_TRASH") {
          tasks.push({
            id : entry.source.id,
            deleted : true
          });
        } else {
          tasks.push({
            id : entry.source.id,
            deleted : false
          });
        };

      };
    });


  });

  console.log(tasks);

  next(null, tasks, updateDate);
};
