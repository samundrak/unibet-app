import jsonp from 'jsonp';
import * as API from './consts';

export function getScores() {
  return new Promise((resolve, reject) => {
    jsonp(API.LIVE_SCORE_API, (error, data) => {
      console.log(error, data);
      if (error) {
        return reject(error);
      }
      return resolve(data);
    });
  });
}
