import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Other extends Component {
  render() {
    return (
      <div className="Home">
        This is Other!
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default Other;
