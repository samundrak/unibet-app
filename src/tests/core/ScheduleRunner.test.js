import ScheduleRunner from '../../core/ScheduleRunner';

describe('Test ScheduleRunner', () => {
  it('should call runner on provided interval', done => {
    const schedule = new ScheduleRunner({ interval: 3000 });
    const runner1 = {
      run: jest.fn(() => null),
    };
    schedule.addRunner(runner1);
    expect(schedule._runners.length).toBe(1);
    const runner2 = {
      run: jest.fn(() => null),
    };

    schedule.addRunner(runner2);
    expect(schedule._runners.length).toBe(2);
    expect(runner1.run).toBeCalledTimes(0);
    schedule.start();
    expect(runner1.run).toBeCalledTimes(1);
    expect(runner2.run).toBeCalledTimes(1);
    setTimeout(() => {
      expect(runner1.run).toBeCalledTimes(2);
      expect(runner2.run).toBeCalledTimes(2);
      done();
    }, 4000);
  });
});
