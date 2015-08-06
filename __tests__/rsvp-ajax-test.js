
jest.dontMock('../rsvp-ajax.js');
jest.dontMock('rsvp');

var s = require('../rsvp-ajax.js');


describe('should handle requests', function () {
  var stubs;

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
    var xhrModuleMock = require('../xhr.js');
    xhrModuleMock.exports = xhrStub;
  });

  it('should handle GET request', function () {
    expect(2*2).toBe(4);
  });
});


