import React, { Component } from 'react';
import './App.css';
import SimpleLayout from './components/SimpleLayout';
import Unibet from './core/Unibet';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalRecords: 0,
      loading: true,
    };

    this._records = new Map();
    window._records = this._records;
  }
  componentDidMount() {
    this.controller = new Unibet();
    this.controller.boot();
    this.controller.on(Unibet.EVENT_DATA_STORED, ({ records }) => {
      this.setState({
        loading: false,
        totalRecords: records.length,
      });
      records.forEach((element, index) => {
        this._records.set(index, element);
      });
    });
  }

  render() {
    return (
      <div>
        <SimpleLayout
          loading={this.state.loading}
          totalRecords={this.state.totalRecords}
          records={this._records}
        />
      </div>
    );
  }
}

export default App;
