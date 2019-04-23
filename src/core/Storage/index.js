// @flow
import type { DBContract } from '../../types/DBContract';

class Storage {
  db: DBContract;

  constructor(db: DBContract) {
    this.db = db;
  }

  table(tableName: string): DBContract {
    return this.db.setTable(tableName);
  }
  get(key: string) {
    return this.db.get(key);
  }

  set(key: string, value: string): DBContract {
    return this.db.set(key, value);
  }
  clear() {
    this.db.clear();
  }
  bulkCreate(records: Array<any>) {
    console.log('hello world');
    this.db.bulkCreate(records);
  }
}

export default Storage;
