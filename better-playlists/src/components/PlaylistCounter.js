import React, { Component } from 'react';
import './PlaylistCounter.css';


class PlaylistCounter extends Component {
  render() {
    return(
      <div className='playlist-counter'>
        <h2>{this.props.playlists && this.props.playlists.length} Playlists</h2>
      </div>
    );
  }
}

export default PlaylistCounter;
