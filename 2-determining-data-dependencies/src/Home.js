import React, { Component } from 'react';

class Home extends Component {
  static async getInitialProps() {
    console.log('Fetching Home!');
  }

  componentDidMount() {
    Home.getInitialProps();
  }

  componentDidUpdate(prevProps){
    // Only fetch data if location has changed
    if (this.props.location != prevProps.location)
      Home.getInitialProps();
  }

  render() {
    return (
      <div className="Home">
        This is the home!
      </div>
    );
  }
}

export default Home;
