import EventEmitter from './EventEmitter';
import ScheduleRunner from './ScheduleRunner';
import LiveScoreFetcher from './LiveScoreFetcher';
import Storage from './Storage';
import Dexie from './Storage/providers/Dexie';

class Unibet extends EventEmitter {
  boot() {
    this.storage = new Storage(new Dexie());
    const scheduler = new ScheduleRunner({ interval: 60000 * 2 });
    const liveScoreFetcher = new LiveScoreFetcher();
    liveScoreFetcher.on('data', this.handleNewData.bind(this));
    scheduler.addRunner(liveScoreFetcher);
    scheduler.start();
  }

  handleNewData({ records }) {
    this.insertRecords(records);
    this.emit(Unibet.EVENT_DATA_STORED, { records });
  }
  insertRecords(records) {
    this.storage.table('records').clear();
    console.log('insert records');
    this.storage.bulkCreate(records);
  }
}

Unibet.EVENT_DATA_STORED = 'data:stored';
export default Unibet;
