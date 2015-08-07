rsvp-ajax
=========

# Overview

This library is a very simple wrapper on top of XMLHttpRequest that exposes its capabilities via [rsvp](https://github.com/tildeio/rsvp.js) promises.

Published module can be found in npm repository, latest stable version is available [here](https://www.npmjs.com/package/rsvp-ajax).

# Simple Usage Sample

```js
var ajax = require('rsvp-ajax');

// GET request:
var promise = ajax.request('GET', '/rest/resource/1');
promise.then(function (data) {
  // Note, that 'application/json' content type is expected by default and response
  // is automatically transformed to Javascript object
  console.log('Data received:', data);
});
//...

// POST request + error handling:
var body = {'do': 'something'};
var promise = ajax.request('POST', '/rest/trigger/action', body);
promise.then(function (data) {
  console.log('Data received:', data);
}, function (xhr) {
  // handle error, passed object is an XMLHttpRequest instance
  console.error('POST /rest/trigger/action returned error status', xhr.status);
});
```

Including in your ``package.json``:

```
  "devDependencies": {
...
    "rsvp-ajax": "^1.0.0",
...
  },
```

# Advanced Usage

For non-trivial AJAX requests use ``requestObject`` function.

For example, sending a request body in plain text form and receive response as plain text you can be done as follows:

```js
  var ajax = require('rsvp-ajax');
  
  var password = "HelloWorld";
  var promise = ajax.requestObject({
    method: "POST",               // Do POST request...
    url: "/rest/password/encode", // ...to this relative URL
    requestBody: password,        // ...using requestBody as string
    contentType: "text/plain",    // ...set Content-Type to text/plain
    accept: "text/plain"          // ...set Accept to text/plain
  });
```

All the parameters expected by ``requestObject`` function:

* ``responseType`` - tells how to decode a response. Possible values: ``text`` and ``json``. Default value is ``text``.
* ``method`` - request method. Can be ``GET``, ``POST``, ``DELETE``, ``PUT``. Default value is ``GET``.
* ``url`` - relative URL to invoke. Default value is ``/``.
* ``requestBody`` - an object that should be sent in the request. Default value is ``null``.
* ``accept`` - expected response content type (e.g. value in Accept header). Default value is ``*/*``.
* ``contentType`` - MIME type that identifies request body encoding scheme. Default value is ``null`` which means that this field will not be set.

The simpler counterpart - ``request`` function uses different defaults. It sets contentType to ``application/json`` whenever request body is passed to ``request`` function. Also it always sets Accept header to ``application/json`` and finally ``responseType`` is always ``json``.

The fulfilled promise handler of the result of ``request`` and ``requestObject`` function calls always takes a decoded response body and failed promise handler always takes an instance of ``XMLHttpRequest`` used to make the associated AJAX call.

