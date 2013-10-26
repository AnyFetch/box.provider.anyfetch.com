'use strict';

require('should');
var box = require('../lib/provider-box/helpers/box');

describe("Box API wrapper", function() {
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
});
