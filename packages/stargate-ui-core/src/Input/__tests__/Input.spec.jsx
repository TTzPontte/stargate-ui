import React from 'react';

import Input from '../Input';

describe('Input', () => {
  it('should render properly', () => {
    const { container } = render(
      <Input name="inputName" label="Lorem ipsum dolor" />
    );

    expect(container).toMatchSnapshot();
  });
});
