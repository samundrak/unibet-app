import React from 'react';
import { render } from 'react-dom';
import Header from '../../components/Header';

describe('test Header', () => {
  it('should test snapshot', () => {
    const container = document.createElement('div');
    render(<Header />, container);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
