import React from 'react';
import $ from 'jquery';
import List from './listview.jsx';

module.exports = React.createClass({
  loadSeasons: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, error) {
        console.error(this.props.url, status, error.toString());
      }.bind(this)
    });
  },
  handleSearch: function(id) {
    $.ajax({
      url: this.props.url + '/' + id,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({vegList: data.vegetables});
      }.bind(this),
      error: function(xhr, status, error) {
        console.error(this.props.url, status, error.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: [], vegList: []};
  },
  componentDidMount: function() {
    this.loadSeasons();
  },
  render: function() {
    return (
      <div className="seasonNav">
        <div>
            <SeasonList data={this.state.data} getVeggies={this.handleSearch} />
        </div>
        <div>
            <List data={this.state.vegList} />
        </div>
      </div>
    );
  }
});

var SeasonList = React.createClass({
  render: function() {
    var getVeggies = this.props.getVeggies;
    var nodes = this.props.data.map(function(item) {
      return (
        <NavElement name={item.name} key={item.id} id={item.id} getVeggies={getVeggies} />
      );
    });
    return (
      <div className="seasonList">
        {nodes}
      </div>
    );
  }
});

var NavElement = React.createClass({
  showVeggies: function(e) {
    e.preventDefault();
    this.props.getVeggies(this.props.id);
  },
  render: function() {
    return (
      <a className="seasonElement" href="#" onClick={this.showVeggies}>{this.props.name}</a>
    );
  }
});
