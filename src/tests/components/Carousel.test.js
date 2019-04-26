import React from 'react';
import { mount } from 'enzyme';
import Carousel from '../../components/Carousel';

describe('Carousel', () => {
  it('should display error message with error', () => {
    const wrapper = mount(
      <Carousel
        width="600px"
        height="400px"
        loading={false}
        wasErrorFetchingLiveScore={true}
        totalCount={1}
        render={() => <div>I am slide</div>}
      />,
    );
    expect(wrapper.text()).toContain('No items');
    wrapper.setProps({
      onError: () => 'custom error',
    });
    expect(wrapper.text()).toContain('custom error');
  });

  it('should render slide smoothly', done => {
    const wrapper = mount(
      <Carousel
        width="600px"
        height="400px"
        loading={true}
        wasErrorFetchingLiveScore={false}
        totalCount={2}
        render={index => <div>slide {index}</div>}
      />,
    );

    expect(wrapper.find('div.lds-hourglass').html()).toEqual(
      '<div class="lds-hourglass"></div>',
    );
    wrapper.setProps({
      loading: false,
    });
    expect(wrapper.text()).toBe('slide 0slide 0');
    setTimeout(() => {
      expect(wrapper.text()).toBe('slide 1slide 1');
      done();
    }, 4000);
  });
});
