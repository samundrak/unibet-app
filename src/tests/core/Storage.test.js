import Storage from '../../core/Storage';
import Dexie from '../../core/Storage/providers/Dexie';
jest.mock('../../core/Storage/providers/Dexie.js');

describe('Test Storage', () => {
  it('should test functions of storage', () => {
    const dexie = new Dexie();
    const storage = new Storage(dexie);
    expect(storage.table('preferences').get('name')).toBe('samundra');
    expect(dexie.setTable).toBeCalledTimes(1);
    expect(dexie.setTable).toBeCalledWith('preferences');
    expect(dexie.get).toBeCalledTimes(1);
    expect(dexie.get).toBeCalledWith('name');
  });
});
