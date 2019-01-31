import React, { Component } from 'react';

export default class App extends Component {
  onClick = () => {
    console.log('hit me plz');
  }
  render() {
    return (
      <div className="App">
        <button type="button" onClick={this.onClick}>hit me plz</button>
      </div>
    );
  }
}
