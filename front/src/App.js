import React from 'react';
import Landing from './Components/Landing/index';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { userdata: {}, token: '' };

  }

  componentWillMount() {
    axios.get().then().catch();
  }

  render() {
    return (

      <Landing />

    );
  }
}

export default App;
