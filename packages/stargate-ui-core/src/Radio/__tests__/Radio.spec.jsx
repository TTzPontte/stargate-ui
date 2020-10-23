import React from 'react';

import Radio from '../Radio';

describe('Radio', () => {
  it('should render properly', () => {
    const { container } = render(
      <Radio label="Radio Button"/>
    );

    expect(container).toMatchSnapshot();
  });
});
