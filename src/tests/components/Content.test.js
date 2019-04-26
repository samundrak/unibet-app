import React from 'react';
import { render } from 'react-dom';
import Content from '../../components/Content';

describe('test content', () => {
  it('should test snapshot', () => {
    const container = document.createElement('div');
    render(
      <Content
        totalRecords={1}
        loading={false}
        records={new Map([[1, { event: { score: {} } }]])}
        wasErrorFetchingLiveScore={false}
      />,
      container,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });
});
