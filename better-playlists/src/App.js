import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';
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
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if(!accessToken)
      return;

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then((response) => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then((response) => response.json())
    .then(playlistData => {
      let playlists = playlistData.items
      let trackDataPromises = playlists.map(playlist => {
        let responsePromise = fetch(playlist.tracks.href, {
          headers: {'Authorization': 'Bearer ' + accessToken}
        })
        let trackDataPromise = responsePromise.then(response => response.json())
        return trackDataPromise
      })
      let allTracksDatasPromises = Promise.all(trackDataPromises)
      let playlistsPromise = allTracksDatasPromises.then(trackDatas => {
          trackDatas.forEach((trackData, i)=> {
            playlists[i].trackDatas = trackData.items
            .map(item => item.track)
            .map(trackData => ({
              name: trackData.name,
              duration: trackData.duration_ms/1000
            }))
          })
          return playlists
        })
      return playlistsPromise
    })
    .then(playlists => this.setState({
      playlists: playlists.map(item => {
        return {
          name: item.name,
          imageUrl: item.images[0].url,
          songs: item.trackDatas.slice(0,3)
        }

      })
    }))
  }

  render() {
    let playlistToRender =
      this.state.user &&
      this.state.playlists
        ? this.state.playlists.filter(playlist =>
          playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase()))
        : []
    return(
      <div className="App">
        {this.state.user ?
          <div>
            <h1>{this.state.user.name}'s Playlists</h1>
              <PlaylistCounter playlists={playlistToRender} />
              <HoursCounter playlists={playlistToRender}/>
              <Filter onTextChange={text => this.setState({filterString: text})}/>
              {playlistToRender.map(playlist =>
                <Playlist playlist={playlist} imageUrl={playlist.imageUrl}/>
              )}
          </div> : <button
                      onClick={() => {
                        window.location = window.location.href.includes('localhost')
                        ?  'http://localhost:8888/login'
                        : 'https://better-playlists-backend-tev.herokuapp.com/login'}
                      }
                      style={{padding: '20px', fontSize: '32px', marginTop: '20px'}}
                    >
                      Sign In with Spotfiy
                    </button>
        }
      </div>
    );
  }
}

export default App;
