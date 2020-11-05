import React from 'react';

import Dropdown from '../Dropdown';

describe('Dropdown', () => {
  it('should render properly', () => {
    const { container } = render(
      <Dropdown label="Dropdown"/>
    );

    expect(container).toMatchSnapshot();
  });
});
