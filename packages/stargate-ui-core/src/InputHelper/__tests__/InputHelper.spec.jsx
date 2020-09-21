import React from 'react';

import InputHelper from '../InputHelper';

describe('InputHelper', () => {
  it('should render properly', () => {
    const { container } = render(
      <InputHelper>
        Lorem ipsum dolor siet amiet.
      </InputHelper>
    );

    expect(container).toMatchSnapshot();
  });
});
