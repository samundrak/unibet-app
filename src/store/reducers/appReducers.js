import { set } from 'dot-prop-immutable';
import { UPDATE_ALL_EVENTS } from '../types';

const initialState = {
  events: [],
};
export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ALL_EVENTS:
      return set(state, 'events', action.events);
    default:
      return state;
  }
}
