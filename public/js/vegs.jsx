'use strict';

import React from 'react';
import $ from 'jquery';
import List from './listview.jsx';

export default React.createClass({
  loadVegetablesFromServer: function() {
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
  handleVegetableSubmit: function(vegetable) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: vegetable,
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
    this.loadVegetablesFromServer();
  },
  render: function() {
    return (
      <div className="vegetableBox">
        <List data={this.state.data} />
      </div>
    );
  }
});
