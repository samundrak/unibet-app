// @flow
export interface DBContract {
  setTable(key: string): DBContract;
  clear(): void;
  bulkCreate(Array<any>): void;
  delete(string): void;
  add({ key: string, value: any }): void;
  all(): Array<any>;
  get(key: string): any;
  set(key: string, value: any): DBContract;
}
