var React = require('react');
var $ = require('jquery');
var List = require('./listview.jsx');

var SeasonBox = React.createClass({
  loadSeasonsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadSeasonsFromServer();
  },
  render: function() {
    return (
      <div className="seasonBox">
        <List data={this.state.data} />
      </div>
    );
  }
});

module.exports = SeasonBox;
