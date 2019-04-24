import React, { Component } from 'react';
import './App.css';
import SimpleLayout from './components/SimpleLayout';
import Unibet from './core/Unibet';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalRecords: 0,
    };
    this._records = new Map();
  }
  componentDidMount() {
    this.controller = new Unibet();
    this.controller.boot();
    this.controller.on(Unibet.EVENT_DATA_STORED, ({ records }) => {
      console.log(records[0]);
      this.setState({
        totalRecords: records.length,
      });
      records.forEach((element, index) => {
        this._records.set(index, element);
      });
    });
  }

  render() {
    return (
      <SimpleLayout
        totalRecords={this.state.totalRecords}
        records={this._records}
      />
    );
  }
}

export default App;
