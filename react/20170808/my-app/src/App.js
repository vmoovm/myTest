import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CommentList from './components/commentList/commentList.jsx'

var myStyle = {
    fontSize: '1rem',
    color: '#FF0000'
};

class App extends Component {
  render() {
    return (
      <div className="App">
      	<CommentList></CommentList>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro" style={myStyle}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
