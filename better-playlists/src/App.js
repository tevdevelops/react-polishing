import React, { Component } from 'react';
import './App.css';
import Aggregrate from './components/Aggregrate';
import Filter from './components/Filter';
import Playlist from './components/Playlist';

class App extends Component {
  render() {
    return(
      <div className="App">
        <h1>Title</h1>
        <Aggregrate />
        <Aggregrate />
        <Filter/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
      </div>
    );
  }
}

export default App;
