import React from 'react';

import Input from '../Input';

describe('Input', () => {
  it('should render properly', () => {
    const { container } = render(
      <Input label="Lorem ipsum dolor" />
    );

    expect(container).toMatchSnapshot();
  });
});
