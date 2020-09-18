import React from 'react';

import Label from '../Label';

describe('Label', () => {
  it('should render properly', () => {
    const { container } = render(
      <Label>
        Lorem ipsum dolor
      </Label>
    );

    expect(container).toMatchSnapshot();
  });
});
