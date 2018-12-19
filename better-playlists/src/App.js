import React, { Component } from 'react';
import './App.css';
import PlaylistCounter from './components/PlaylistCounter';
import HoursCounter from './components/HoursCounter';
import Filter from './components/Filter';
import Playlist from './components/Playlist';

let fakeServerData = {
  user: {
    name: 'Tevin',
    playlists: [
      {
        name: 'My Favorites',
        songs: [
          {name: 'Lost Boy', duration: 200},
          {name: 'Hard', duration: 205},
          {name: 'Tadow', duration: 209}
        ]
      },
      {
        name: 'Party Jams',
        songs: [
          {name: 'Fun Song 1', duration: 210},
          {name: 'Party Song 1', duration: 219},
          {name: 'Party Song 2', duration: 201}
        ]
      },
      {
        name: 'LoFi Hip Hop',
        songs: [
          {name: 'Chill Song 1', duration: 218},
          {name: 'Chill Song 2', duration: 209},
          {name: 'Chill Song 3', duration: 219}
        ]
      }
    ]
  }
}


class App extends Component {
  constructor(props) {
    super();
    this.state = {
      serverData: {},
      filterString: ''
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }

  render() {
    return(
      <div className="App">
        {this.state.serverData.user ?
          <div>
            <h1>{this.state.serverData.user.name}'s Playlists</h1>
            <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
            <HoursCounter playlists={this.state.serverData.user.playlists}/>
            <Filter onTextChange={text => this.setState({filterString: text})}/>
            {this.state.serverData.user.playlists.filter(playlist =>
              playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
            ).map(playlist =>
              <Playlist playlist={playlist}/>
            )}
          </div> : <h1>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
