/**
 * @file Defines the provider settings.
 *
 * Will set the path to Mongo, and applications id
 * Most of the configuration can be done using system environment variables.
 */

// Load environment variables from .env file
var dotenv = require('dotenv');
dotenv.load();

// node_env can either be "development" or "production"
var node_env = process.env.NODE_ENV || "development";

// Port to run the app on. 8000 for development
// (Vagrant syncs this port)
// 80 for production
var default_port = 8000;
if(node_env === "production") {
  default_port = 80;
}

if(!process.env.BOX_CONNECT_URL) {
  console.log("Connect url not specified, oAuth will not work.");
}

// Exports configuration for use by app.js
module.exports = {
  env: node_env,
  port: process.env.PORT || default_port,
  mongo_url: process.env.MONGO_URL || ("mongodb://localhost/provider-box-" + node_env),

  box_id: process.env.BOX_ID,
  box_secret: process.env.BOX_SECRET,
  box_callback: process.env.BOX_CALLBACK_URL,
  box_connect: process.env.BOX_CONNECT_URL,

  anyfetch_id: process.env.ANYFETCH_ID,
  anyfetch_secret: process.env.ANYFETCH_SECRET,

  max_concurrency: process.env.BOX_MAX_CONCURRENCY || 5,
  workers: process.env.WORKERS || 2,

  test_refresh_token: process.env.BOX_TEST_REFRESH_TOKEN,

  test_cursor: process.env.BOX_TEST_CURSOR
};
