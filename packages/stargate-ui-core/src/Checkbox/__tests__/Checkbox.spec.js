import React from 'react';

import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  it('should render properly', () => {
    const { container } = render(
      <Checkbox label="Label" checkboxLabel="Checkbox"/>,
    );

    expect(container).toMatchSnapshot();
  });
});
