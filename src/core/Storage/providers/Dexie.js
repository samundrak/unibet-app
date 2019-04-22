// @flow
import DexieDB from 'dexie';
import type { DBContract } from '../../../types/DBContract';

class Dexie implements DBContract {
  static DB: string;
  db: DexieDB;

  constructor() {
    this.db = new DexieDB(Dexie.DB);
    this.db.version(2).stores({
      scores: 'key',
      preferences: 'key',
    });
  }

  get(key: string) {}

  set(key: string, value: string): Dexie {
    return this;
  }
}
Dexie.DB = 'unibet';
export default Dexie;
