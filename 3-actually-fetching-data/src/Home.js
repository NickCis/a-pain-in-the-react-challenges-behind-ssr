import React, { Component } from 'react';

class Home extends Component {
  static async getInitialProps({ fetch }) {
    return fetch('/data')
      .then(r => r.json())
  }

  state = {};

  componentDidMount() {
    Home.getInitialProps({
      fetch,
      match: this.props.match,
    }).then(r => this.setState(r));
  }

  componentDidUpdate(prevProps){
    // Only fetch data if location has changed
    if (this.props.location != prevProps.location)
      Home.getInitialProps({
        fetch,
        match: this.props.match,
      }).then(r => this.setState(r));
  }

  render() {
    const { data } = this.state;

    return (
      <div className="Home">
        This is the home!
        <div>
          Fetched data: {data}
        </div>
      </div>
    );
  }
}

export default Home;
