import EventEmitter from '../../core/EventEmitter';

describe('Test EventEmitter', () => {
  it('should call listener', () => {
    const fn = jest.fn(() => null);
    const event = new EventEmitter();
    event.on('test', fn);
    expect(event.listeners.get('regular').size).toBe(1);
    event.emit('test', {});
    expect(fn).toBeCalledTimes(1);
    event.emit('test', {});
    expect(fn).toBeCalledTimes(2);
  });
});
