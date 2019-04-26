import React from 'react';
import { shallow } from 'enzyme';
import SimpleLayout from '../../components/SimpleLayout';

describe('Test SimpleLayout', () => {
  it('should test snapshot', () => {
    const wrapper = shallow(
      <SimpleLayout
        wasErrorFetchingLiveScore={false}
        loading={false}
        totalRecords={1}
        records={new Map([[1, {}]])}
      />,
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
});
