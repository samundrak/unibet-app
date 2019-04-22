// @flow
import EventEmitter from './EventEmitter';
import type { ScheduleRunnerContract } from '../types/ScheduleRunnerContract';
import { getScores } from '../api';
import Storage from './Storage';

class LiveScoreFetcher extends EventEmitter implements ScheduleRunnerContract {
  storage: Storage;

  constructor(storage: Storage) {
    super();
    this.storage = storage;
  }
  /**
   * This method will be executed by ScheduleRunner on every (n) time(ms/s)
   */
  run() {
    (async function() {
      const scores = getScores();
      console.log(scores);
    })();
    console.log(this.storage);
    console.log('I am datqa fetchger');
  }
}
export default LiveScoreFetcher;
