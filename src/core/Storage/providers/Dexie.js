// @flow
import DexieDB from 'dexie';
import type { DBContract } from '../../../types/DBContract';

class Dexie implements DBContract {
  static DB: string;
  table: string;
  db: DexieDB;

  constructor() {
    this.db = new DexieDB(Dexie.DB);
    this.db.version(2).stores({
      records: '++id',
      preferences: 'key',
    });
  }

  setTable(table: string): Dexie {
    this.table = table;
    return this;
  }
  get(key: string) {}

  set(key: string, value: string): Dexie {
    return this;
  }
  clear() {
    if (!this.db[this.table]) {
      return;
    }
    return this.db[this.table].clear();
  }
  bulkCreate(records: Array<any>) {
    if (!this.db[this.table]) return;
    return this.db[this.table].bulkAdd(records);
  }
}
Dexie.DB = 'unibet';
export default Dexie;
