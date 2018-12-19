import React, { Component } from 'react';
import './Filter.css';


class Filter extends Component {
  render() {
    return(
      <div className='filter'>
        <img />
        <input type='text' onChange={event => this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}

export default Filter;
