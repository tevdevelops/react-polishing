import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

var client_id = '818f5fade078405ca810a2cc639c0a27'
var client_secret = '74415855353f427db1b1148f636afdf2'
//var redirect_uri = ‘REDIRECT_URI’; // Your redirect uri


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  search() {
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?'
    const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
    console.log('FETCH_URL', FETCH_URL);
  }

  render() {
    return(
      <div className="app">
        <div className='app-title'>Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type='text'
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search()
                }
              }}
            />
          <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <div className="profile">
          <div>Artist Picture</div>
          <div>Artist Name</div>
        </div>
        <div className="gallery">
          Gallery
        </div>
      </div>
    )
  }
}

export default App;
