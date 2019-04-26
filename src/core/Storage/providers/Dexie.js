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
  get(key: string) {
    return this.db[this.table].get({ key });
  }

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

  delete(key: string) {
    return this.db[this.table].delete(key);
  }

  add({ key, value }: { key: string, value: any }) {
    return this.db[this.table].add({ key, value });
  }

  all() {
    return this.db[this.table].toArray();
  }
}
Dexie.DB = 'unibet';
export default Dexie;
