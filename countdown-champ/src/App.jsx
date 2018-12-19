import React, { Component } from 'react';
import Clock from './Clock';
import './App.css';
import { Form, FormControl, Button } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deadline: 'December 25, 2018',
      newDeadline: '',
      appClass: 'App christmas'
    }
  }

  changeDeadline() {
    this.setState({
      deadline: this.state.newDeadline
    })
    if(this.state.deadline === 'December 25, 2018') {
      this.setState({appClass: 'App christmas'});
    }
    else {
      this.setState({appClass: 'App'});
    }
  }

  render() {
    return(
      <div className={this.state.appClass}>
        <div className='App-title'>Countdown to {this.state.deadline}</div>
        <Clock
          deadline={this.state.deadline}
        />
        <Form inline>
          <FormControl
            className="deadline-input"
            placeholder='new date'
            onChange={event => this.setState({newDeadline: event.target.value})}
          />
          <Button onClick={() => this.changeDeadline()}>Submit</Button>
        </Form>
      </div>
    )
  }
}

export default App;
