import React, { Component } from 'react';
import { Router } from '@reach/router';
import SignUp from './SignUp';
import Todo from './Todo';

class App extends Component {
  render() {
    return (
      <Router>
        <SignUp path="/" />
        <Todo path="todo" />
      </Router>
    )
  }
}


export default App;