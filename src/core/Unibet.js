import differenceInMinutes from 'date-fns/difference_in_minutes';
import EventEmitter from './EventEmitter';
import ScheduleRunner from './ScheduleRunner';
import LiveScoreFetcher from './LiveScoreFetcher';
import Storage from './Storage';
import Dexie from './Storage/providers/Dexie';

class Unibet extends EventEmitter {
  /**
   * Setup storage instances,
   * start schedule runner
   * and determine if have to execute runner instantly
   */
  async boot() {
    this.storage = new Storage(new Dexie());
    const lastFetched = await this.getPreferences('lastFetched');
    let shouldExecuteRunnerImmediate = this.shouldExecuteRunnerImmediate(
      lastFetched,
    );
    const scheduler = new ScheduleRunner({
      interval: 60000 * Unibet.CACHE_BRUSTING_IN_MINUTE,
    });
    const liveScoreFetcher = new LiveScoreFetcher();
    liveScoreFetcher.on('data', this.handleNewData.bind(this));
    scheduler.addRunner(liveScoreFetcher);
    scheduler.start({ runImmediate: shouldExecuteRunnerImmediate });
    if (!shouldExecuteRunnerImmediate) {
      const records = await this.storage.table('records').all();
      this.handleNewData({ records });
    }
  }

  shouldExecuteRunnerImmediate(lastFetched) {
    if (
      lastFetched &&
      differenceInMinutes(Date.now(), lastFetched) <
        Unibet.CACHE_BRUSTING_IN_MINUTE
    ) {
      return false;
    }
    return true;
  }
  handleNewData({ records }) {
    this.insertRecords(records);
    this.emit(Unibet.EVENT_DATA_STORED, { records });
    this.setPreferences('lastFetched', Date.now());
  }

  /**
   * Helps us inserting bulk records
   */
  insertRecords(records) {
    this.storage.table('records').clear();
    this.storage.bulkCreate(records);
  }

  getPreferences(key, defaulValue) {
    return this.storage
      .table('preferences')
      .get(key)
      .then(data => (data || {}).value || defaulValue);
  }

  /**
   * Helper to store our app related preferences
   */
  async setPreferences(key, value) {
    await this.storage.table('preferences').delete(key);
    return this.storage.table('preferences').add({ key, value });
  }
}

Unibet.CACHE_BRUSTING_IN_MINUTE = 2;
Unibet.EVENT_DATA_STORED = 'data:stored';
export default Unibet;
