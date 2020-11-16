import React from 'react';

import Dropdown from '../Dropdown';

describe('Dropdown', () => {
  it('should render properly', () => {
    const numbers = [1, 2, 3, 4];
    const { container } = render(
      <Dropdown label="Dropdown" options={numbers} />
    );

    expect(container).toMatchSnapshot();
  });
});
