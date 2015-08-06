
jest.dontMock('../rsvp-ajax.js');
jest.dontMock('rsvp');

describe('request handling', function () {
  var stubs;

  //
  // Stub for XMLHttpRequest
  //

  var DONE = 'DONE';

  var xhrStub = function StubHttpRequest() {
    this._headers = {};
    this._bodies = [];
    this.onreadystatechange = null;
    this.responseType = null;
    this.DONE = DONE;
    this.readyState = null;
    this.response = null;
    this.status = null;
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
    // Given:
    var s = require('../rsvp-ajax.js');
    var mockResult = {"mock": "result"};
    var resultHolder = null;
    var stub = null;

    // When:
    var promise = s.request("GET", "/rest/something");
    promise.then(function (data) {
      console.log("capturing data", data);
      resultHolder = data;
    });

    // Then:
    expect(stubs.length).toBe(1);
    expect(resultHolder).toBe(null);

    // prepare the result, signal about completion and make sure promise handler caught it
    stub = stubs[0];
    stub.status = 200;
    stub.readyState = DONE;
    stub.response = mockResult;
    stub.onreadystatechange();

    // TODO: test it
    //expect(resultHolder).toEqual(mockResult);
  });
});


