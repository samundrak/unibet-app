import React from 'react';
import { shallow } from 'enzyme';
import Scoreboard from '.././../components/Scoreboard';

const data = {
  homeName: 'samundra',
  awayName: 'notsamundra',
  sport: 'football',
  start: new Date().toString(),
  score: {
    home: '1',
    away: '1',
  },
};
describe('test scoreboard', () => {
  it('should render scorboard', () => {
    const wrapper = shallow(<Scoreboard event={data} />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
