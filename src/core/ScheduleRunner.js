// @flow
import EventEmitter from './EventEmitter';
import type { ScheduleRunnerContract } from '../types/ScheduleRunnerContract';

class ScheduleRunner extends EventEmitter {
  interval: number;
  _instanceOfInterval: intervalId;
  _runners: Array<ScheduleRunnerContract>;

  constructor({ interval }: { interval: number }) {
    super();
    this.interval = interval;
    this._instanceOfInterval = -1;
    this._runners = [];
  }

  addRunner(runner: ScheduleRunnerContract) {
    this._runners.push(runner);
  }
  _executeRunners() {
    this._runners.forEach((runner: ScheduleRunnerContract) => {
      runner.run();
    });
  }
  /**
   * Will executes all registered runners as soon as start is called
   * and other will be executed after setInterval
   */
  start(options: { runImmediate: boolean } = { runImmediate: true }) {
    if (options.runImmediate) {
      this._executeRunners();
    }
    this._instanceOfInterval = setInterval(() => {
      this._executeRunners();
    }, this.interval);
  }

  stop() {
    clearInterval(this._instanceOfInterval);
  }
}
export default ScheduleRunner;
