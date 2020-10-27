import React from 'react';

import Count from '../Count';

describe('Count', () => {
  it('should render properly', () => {
    const { container } = render(
      <Count
        /**
         * Prevent Intl error in CI environment.
         */
        currency="USD"
        locale="en-US"
      >
        123.456,00
      </Count>,
    );

    expect(container).toMatchSnapshot();
  });
});
