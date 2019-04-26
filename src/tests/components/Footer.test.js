import React from 'react';
import { render } from 'react-dom';
import Footer from '../../components/Footer';

describe('test Footer', () => {
  it('should test snapshot', () => {
    const container = document.createElement('div');
    render(<Footer />, container);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
