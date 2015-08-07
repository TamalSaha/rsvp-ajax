var React = require('React');

var Dispatcher = require('./view/dispatcher.js');

window.onload = function () {
  React.render(React.createElement(Dispatcher), document.getElementById('main-content'));
}


