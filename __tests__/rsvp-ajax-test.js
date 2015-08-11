
jest.dontMock('../rsvp-ajax.js');
jest.dontMock('rsvp');


var DONE = 'DONE';

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
    this.DONE = DONE;
    this.readyState = null;
    this.response = null;
    this.status = null;
    stubs.push(this);
  };

  xhrStub.prototype.open = function (method, url) {}

  xhrStub.prototype.setRequestHeader = function (headerName, value) {
    this._headers[headerName] = value;
  };

  xhrStub.prototype.send = function (body) {
    this._bodies.push(body);
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

    // When:
    var promise = s.request("GET", "/rest/something");
    promise.then(function (data) {
      resultHolder = data;
    });

    // Then:
    expect(stubs.length).toBe(1);
    expect(resultHolder).toBe(null);

    // prepare the result, signal about completion and make sure promise handler caught it
    var stub = stubs[0];
    stub.status = 200;
    stub.readyState = DONE;
    stub.response = mockResult;
    stub.onreadystatechange();

    jest.runAllTimers();

    expect(resultHolder).toEqual(mockResult);
  });

  it('should handle POST', function () {
    // Given:
    var s = require('../rsvp-ajax.js');
    var mockResult = {"mock": "result"};
    var body = {a: 1, b: [2], c: "3", d: {e: 4}};
    var resultHolder = null;

    // When:
    var promise = s.request("POST", "/rest/something", body);
    promise.then(function (data) {
      resultHolder = data;
    });

    // Then:
    expect(stubs.length).toBe(1);
    expect(resultHolder).toBe(null);

    // prepare the result, signal about completion and make sure promise handler caught it
    var stub = stubs[0];
    stub.status = 200;
    stub.readyState = DONE;
    stub.response = mockResult;
    stub.onreadystatechange();

    jest.runAllTimers();

    expect(resultHolder).toEqual(mockResult);
    expect(stub._bodies[0]).toEqual(JSON.stringify(body));
  });

  it('should emit error event', function () {
    // Given:
    var s = require('../rsvp-ajax.js');
    var holder = {xhr: null, catchXhr: null, ret: null};
    s.on(s.XHR_ERROR, function (xhr) {
      holder.xhr = xhr;
    });

    // When:
    var promise = s.request("POST", "/rest/something", {});
    promise.then(function () {
      holder.ret = 1;
    });
    promise.catch(function (d) {
      holder.catchXhr = d;
    });

    // Then:
    var stub = stubs[0];
    stub.status = 404; // Not Found
    stub.readyState = DONE;
    stub.response = "false";
    stub.onreadystatechange();

    expect(holder.ret).toBe(null);
    expect(holder.catchXhr).toBe(null);

    jest.runAllTimers();

    expect(holder.xhr).toEqual(stub);
    expect(holder.ret).toBe(null);
    expect(holder.catchXhr).toEqual(stub);
  });

  it('should unsubscribe global error handler', function () {
    // Given:
    var s = require('../rsvp-ajax.js');
    var holder = {xhr: null};
    var fn = s.on(s.XHR_ERROR, function (xhr) {
      holder.xhr = xhr;
    });
    s.off(s.XHR_ERROR, fn);

    // When:
    var promise = s.request("POST", "/rest/something", {});

    // Then:
    var stub = stubs[0];
    stub.status = 404; // Not Found
    stub.readyState = DONE;
    stub.response = "false";
    stub.onreadystatechange();

    jest.runAllTimers();

    expect(holder.xhr).toEqual(null);
  });
});


