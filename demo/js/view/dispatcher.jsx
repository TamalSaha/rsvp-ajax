var React = require('React');
var ajax = require('../rsvp-ajax.js');

module.exports = React.createClass({
  getInitialState: function () {
    return {loading: true};
  },

  loadData: function () {
    console.log("in loadData", this);
    var promise = ajax.request("GET", "/demo.json");
    promise.then(function (data) {
      console.log("got data=", data);
      this.setState({loading: false, data: data["message"]});
    }.bind(this), function () {
      this.setState({loading: false, data: "Error while loading data"});
    }.bind(this));
  },

  componentDidMount: function() {
    // normally you should do the same in componentWillReceiveProps if you expect data to change on reload
    this.loadData();
  },

  render: function() {
    if (this.state.loading) {
      return (<p>Loading data using rsvp-ajax...</p>);
    }

    return (<div>RSVP-AJAX Demo. Data: <strong>{this.state.data}</strong></div>);
  }
});

