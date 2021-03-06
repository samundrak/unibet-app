// @flow
import type { EnvType } from '../types';

const env: EnvType = process.env;
export const LIVE_SCORE_API = `https://api.unicdn.net/v1/feeds/sportsbook/event/live.jsonp?app_id=${
  env.REACT_APP_UNIBET_APP_ID
}&app_key=${env.REACT_APP_UNIBET_APP_KEY}`;
