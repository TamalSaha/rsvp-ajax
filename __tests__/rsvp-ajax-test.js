
jest.dontMock('../rsvp-ajax.js');
jest.dontMock('rsvp');

describe('request handling', function () {
  var stubs;

  //
  // Stub for XMLHttpRequest
  //

  var xhrStub = function StubHttpRequest() {
    this._headers = {};
    this._bodies = [];
    this.onreadystatechange = null;
    this.responseType = null;
    stubs.push(this);
  };

  xhrStub.prototype.open = function (method, url) {}

  xhrStub.setRequestHeader = function (headerName, value) {
    this._headers[headerName] = value;
  };

  xhrStub.send = function (body) {
    stubBody.push(body);
  };
  
  beforeEach(function () {
    stubs = []; // clear stubs
    jest.setMock('../xhr.js', xhrStub);
  });

  //
  // Test Cases
  //

  it('should handle GET', function () {
    var s = require('../rsvp-ajax.js');
    var promise = s.request("GET", "/rest/something");
    expect(stubs.length).toBe(1);
  });
});


