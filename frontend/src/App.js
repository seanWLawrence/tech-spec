import React, { Component } from 'react';
import './App.css';
import Specs from './Specs';
import CreateSpec from './CreateSpec';
import Users from './Users';
import CreateUser from './CreateUser';

class App extends Component {
  render() {
    return (
      <>
        <Specs />
        <CreateSpec />
        <Users />
        <CreateUser />
      </>
    );
  }
}

export default App;
