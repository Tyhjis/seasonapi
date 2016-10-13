import React from 'react';

var VegetableForm = React.createClass({
  getInitialState: function() {
    return {name: ''};
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.state.name.trim();
    if(!name) {
      return;
    }
    this.props.onVegetableSubmit({name: name});
    this.setState({name: ''});
  },
  render: function() {
    return (
      <form className="vegetableForm" onSubmit={this.handleSubmit}>
        <input type="text"
        placeholder="Vegetable name"
        value={this.state.name}
        onChange={this.handleNameChange}/>
        <input type="submit" value="Add vegetable" />
      </form>
    );
  }
});

module.exports = VegetableForm;
