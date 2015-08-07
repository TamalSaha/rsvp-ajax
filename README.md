rsvp-ajax
=========

# Overview

This library is a very simple wrapper on top of XMLHttpRequest that exposes its capabilities via [rsvp](https://github.com/tildeio/rsvp.js) promises.

Published module can be found in npm repository, latest stable version is available [here](https://www.npmjs.com/package/rsvp-ajax).

# Usage

Javascript:

```js
var ajax = require('rsvp-ajax');

// GET request:
var promise = ajax.request('GET', '/rest/resource/1');
promise.then(function (data) {
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
