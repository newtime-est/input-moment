import '../src/less/input-moment.less';
import './app.less';
import moment from 'moment';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InputMoment from '../src/input-moment';
import packageJson from '../package.json';

class App extends Component {
  state = {
    m: moment(),
    tab: 0
  };

  handleChange = m => {
    this.setState({ m });
  };

  handleSave = () => {
    console.log('saved', this.state.m.format('llll'));
  };

  handleclicktab = (e, tab) => {
    e.preventDefault();
    this.setState({ tab });
  }

  render() {
    return (
      <div className="app">
        <h1>
          {packageJson.name}: {packageJson.version}
        </h1>
        <h2>{packageJson.description}</h2>
        <form>
          <div className="input">
            <input type="text" value={this.state.m.format('llll')} readOnly />
          </div>
          <InputMoment
            moment={this.state.m}
            onChange={this.handleChange}
            minStep={5}
            onSave={this.handleSave}
            tab={this.state.tab}
            handleclicktab={(e, tab) => {this.handleclicktab(e, tab)}}
            savebuttonlabel={'close it down'}
          />
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
