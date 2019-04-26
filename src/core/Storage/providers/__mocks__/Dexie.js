export default class Dexie {
  setTable = jest.fn().mockImplementation(value => {
    this.table = value;
  });
  get = jest.fn().mockImplementation(value => {
    return 'samundra';
  });
}
