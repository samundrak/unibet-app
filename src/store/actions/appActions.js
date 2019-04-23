import * as Types from '../types';

export function updateAllEvents(events) {
  return {
    type: Types.UPDATE_ALL_EVENTS,
    events,
  };
}
