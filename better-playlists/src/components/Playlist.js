import React, { Component } from 'react';
import './Playlist.css';


class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return(
      <div className='playlist'>
        <img src={this.props.imageUrl} alt="Playlist"/>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song =>
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Playlist;
