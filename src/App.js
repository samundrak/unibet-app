import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.css';
import SimpleLayout from './components/SimpleLayout';
import Unibet from './core/Unibet';
import * as actions from './store/actions/appActions';

class App extends Component {
  componentDidMount() {
    console.log(this.store);
    this.controller = new Unibet();
    this.controller.boot();
    this.controller.on(Unibet.EVENT_DATA_STORED, ({ records }) => {
      console.log(records);
      this.props.actions.updateAllEvents(records);
    });
  }

  render() {
    return <SimpleLayout controller={this.controller} />;
  }
}

const mapStateToProps = (state) => ({
  app: state.app,
});
const mapActionsToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...actions,
    },
    dispatch
  ),
});
export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
