'use strict';

require('should');
var box = require('../lib/provider-box/helpers/box');
var config = require('../config/configuration.js');

describe("Box API wrapper", function() {
  var accessToken;

  describe('getConnectUrl()', function() {
    it("should redirect to box.com", function(done) {
      var url = box.getConnectUrl();
      url.should.include('box.com');

      done();
    });
  });

  describe('getTokens()', function() {
    it("should fail on invalid authorization_grant", function(done) {
      box.getTokens('invalid', function(err, tokens) {
        err.should.not.eql(null);
        if(tokens) {
          throw new Error("No tokens should be returned");
        }

        done();
      });
    });
  });

  describe('getNewTokens()', function() {
    it("should fail on invalid refreshToken", function(done) {
      box.getNewTokens('invalid', function(err, tokens) {
        err.should.not.eql(null);
        if(tokens) {
          throw new Error("No tokens should be returned");
        }

        done();
      });
    });
    it.skip("should return tokens", function(done) {
      box.getNewTokens(config.test_refresh_token, function(err, tokens) {
        if(err) {
          throw err;
        }

        tokens.should.not.eql(null);
        accessToken = tokens.access_token;

        done();
      });
    });
  });

  describe('listFolder()', function() {
    it.skip("should list content in folder", function(done) {
      box.listFolder(0, accessToken, function(err, entries) {
        if(err) {
          throw err;
        }

        entries.length.should.be.above(0);

        done();
      });
    });
  });
});
