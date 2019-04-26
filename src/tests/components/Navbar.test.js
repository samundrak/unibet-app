import React from 'react';
import { render } from 'react-dom';
import Navbar from '../../components/Navbar';

describe('test Navbar', () => {
  it('should test snapshot', () => {
    const container = document.createElement('div');
    render(<Navbar />, container);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
