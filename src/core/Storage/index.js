// @flow
import type { DBContract } from '../../types/DBContract';

class Storage {
  db: DBContract;

  constructor(db: DBContract) {
    this.db = db;
  }

  get(key: string) {
    return this.db.get(key);
  }

  set(key: string, value: string): DBContract {
    return this.db.set(key, value);
  }
}

export default Storage;
