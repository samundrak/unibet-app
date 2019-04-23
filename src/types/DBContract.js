// @flow
export interface DBContract {
  setTable(key: string): DBContract;
  clear(): void;
  bulkCreate(Array<any>): void;

  get(key: string): any;
  set(key: string, value: any): DBContract;
}
