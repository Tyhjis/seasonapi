'use strict';
import React from 'react';

var ListView = React.createClass({
  render: function() {
    var listnodes = this.props.data.map(function(node) {
      return (
        <ListElement name={node.name} key={node.id} id={node.id} />
      );
    });
    return (
      <ul className="listView">
        {listnodes}
      </ul>
    );
  }
});

var ListElement = React.createClass({
  render: function() {
    return (
      <li className="listelement">
        <strong>{this.props.name}</strong>
      </li>
    );
  }
});

module.exports = ListView;
