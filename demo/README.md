
## How to build

First do ``npm install --save-dev``, then ``./node_modules/grunt-cli/bin/grunt`` in ``demo`` folder.

Then go to target folder: ``cd target`` and run ``python -mSimpleHTTPServer``.

Then open ``http://127.0.0.1:8000/`` in your browser. The page should say 'RSVP-AJAX Demo. Data: Hello from rsvp-ajax!'.

## Known Issues

If you're on OSX and you see an error like that:

```
Running "browserify:dist" (browserify) task
>> Error: EMFILE, open '.../demo/node_modules/React/package.json'
Warning: Error running grunt-browserify. Use --force to continue.
```

Try to set ulimit: ``ulimit -n 2560``.



