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
      wasErrorFetchingLiveScore: false,
    };

    this._records = new Map();
    window.records = this._records;
  }
  componentDidMount() {
    this.controller = new Unibet();
    this.controller.boot().catch(error => {
      // incase of any non user friendly error
      // this can be sent to sentry or other error tracking service
      console.error(error.message);
    });
    this.controller.on(Unibet.EVENT_DATA_STORED, this.handleDataStored);
    this.controller.on(Unibet.EVENT_FETCH_ERROR, this.handleDataFetchError);
  }

  handleDataFetchError = ({ error }) => {
    const wasErrorFetchingLiveScore = !this._records.size ? true : false;
    this.setState({
      wasErrorFetchingLiveScore,
      loading: false,
    });
  };

  handleDataStored = ({ records }) => {
    records.forEach((element, index) => {
      this._records.set(index, element);
    });
    this.setState({
      wasErrorFetchingLiveScore: false,
      loading: false,
      totalRecords: this._records.size,
    });
  };
  render() {
    return (
      <div>
        <SimpleLayout
          wasErrorFetchingLiveScore={this.state.wasErrorFetchingLiveScore}
          loading={this.state.loading}
          totalRecords={this.state.totalRecords}
          records={this._records}
        />
      </div>
    );
  }
}

export default App;
