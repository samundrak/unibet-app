// @flow
export interface DBContract {
  get(key: string): any;
  set(key: string, value: any): DBContract;
}
