import React from 'react';
import { render } from 'react-dom';
import { shallow } from 'enzyme';
import Button from '../../components/Button';

describe('Test button', () => {
  it('should render simple button  ', () => {
    const button = shallow(<Button>Primary Button</Button>);
    expect(button.contains('Primary Button'));
  });

  it('should call callback function when clicked', () => {
    const container = document.createElement('div');
    const mockFn = jest.fn();
    const wrapper = shallow(<Button onClick={mockFn}>Simple Button</Button>);
    wrapper.simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(1);
    wrapper.simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
  it('should test snapshot', () => {
    const container = document.createElement('div');
    render(<Button>Click me</Button>, container);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
