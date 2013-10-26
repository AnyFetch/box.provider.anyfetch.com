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

  describe('getRefreshToken()', function() {
    it("should fail on invalid authorization_grant", function(done) {
      box.getRefreshToken('invalid', function(err, refreshToken) {
        err.should.not.eql(null);
        if(refreshToken) {
          throw new Error("No refreshToken should be returned");
        }

        done();
      });
    });
  });

  describe('getAccessToken()', function() {
    it("should fail on invalid refreshToken", function(done) {
      box.getAccessToken('invalid', function(err, accessToken) {
        err.should.not.eql(null);
        if(accessToken) {
          throw new Error("No refreshToken should be returned");
        }

        done();
      });
    });
    it.skip("should return accessToken", function(done) {
      box.getAccessToken(config.test_refresh_token, function(err, _accessToken) {
        if(err) {
          throw err;
        }

        _accessToken.should.not.eql(null);
        accessToken = _accessToken;

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
