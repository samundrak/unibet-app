import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ScheduleRunner from './core/ScheduleRunner';
import LiveScoreFetcher from './core/LiveScoreFetcher';
import Storage from './core/Storage';
import Dexie from './core/Storage/providers/Dexie';

const storage = new Storage(new Dexie());
const scheduler = new ScheduleRunner({ interval: 60000 * 2 });
scheduler.addRunner(new LiveScoreFetcher(storage));
// scheduler.start();
console.log(process.env);
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
if (module.hot) {
  module.hot.accept();
}
