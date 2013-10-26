'use strict';
// Handle initial sync with Cluestr
// Recursively crawl folders datas

var async = require('async');
var box = require('../box');

module.exports = function(accessToken, next) {
  var queue;
  var queueWorker = function(task, cb) {
    box.listFolder(task.folderId, accessToken, function(err, entries) {
      if(err) {
        console.log("Err: ", err);
        return;
      }

      // List all folders and push them to the queue
      entries.forEach(function(entry) {
        if(entry.type === "folder") {
          queue.push({
            folderId: entry.id,
            next: task.next
          });
        }
      });

      var files = [];
      entries.forEach(function(entry) {
        if(entry.type === "file") {
          files.push({
            id: entry.id
          });
        }
      });

      // Push files onto queue for uploading
      if(files.length > 0) {
        task.next(null, files);
      }

      cb();
    });
  };

  queue = async.queue(queueWorker, 15);

  // Start first sync
  queue.push({
    folderId: 0,
    next: next
  });

  queue.drain = function() {
    next(null, [], 0);
  };
};

