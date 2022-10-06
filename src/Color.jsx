import React from 'react';
import ReactDOM from 'react-dom/client';

export default class Dichik extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favoritecolor: 'red' };
    this.btnRef = React.createRef(null);
  }

  componentDidUpdate() {
    document.getElementById('div2').innerHTML =
      'The updated favorite is ' + this.state.favoritecolor;
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ favoritecolor: 'yellow' });
  }

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={(e) => this.handleClick(e)}
          ref={this.btnRef}
        >
          Change Color
        </button>
        <h1>My Favorite Color is {this.state.favoritecolor}</h1>
        <div id="div1"></div>
        <div id="div2"></div>
      </div>
    );
  }
}
