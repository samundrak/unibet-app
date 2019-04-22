// @flow
class EventEmitter {
  listeners: Map<string, Map<string, Array<() => mixed>>>;
  _onEveryCallback: (string, {}) => mixed;
  constructor() {
    this.listeners = new Map([['regular', new Map()]]);
  }

  /**
   * Register new events with listeners
   * @param eventName
   * @param callback
   * @return {EventEmitter}
   */
  on(eventName: string, callback: any => mixed): EventEmitter {
    return this.addListener('regular', eventName, callback);
  }

  addListener(
    eventType: string,
    eventName: string,
    callback: () => mixed,
  ): EventEmitter {
    const event = this.listeners.get(eventType);
    if (!event) return this;
    if (!event.has(eventName)) {
      event.set(eventName, []);
    }
    const eventGroup = event.get(eventName);
    if (!eventGroup) return this;
    eventGroup.push(callback);
    return this;
  }

  onEveryEvent(callback: () => mixed) {
    if (this._onEveryCallback) {
      console.warn('Overring old callback'); // eslint-disable-line
    }
    this._onEveryCallback = callback;
  }
  /**
   * Emit event with data
   * @param eventType
   * @param data
   */
  // prettier-ignore
  emit(eventType: string, data: any): EventEmitter { // eslint-disable-line
      const regular = this.listeners.get('regular');
      if (this._onEveryCallback) {
        this._onEveryCallback(eventType, data);
      }
      
      if (regular) {
        (regular.get(eventType) || []).forEach((listener: ({}) => mixed) => {
          listener({ ...data, eventType });
        });
      }
      return this;
    }
}

export default EventEmitter;
