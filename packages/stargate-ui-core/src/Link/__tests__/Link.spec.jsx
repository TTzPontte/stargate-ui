import React from 'react';

import Link from '../Link';

describe('Link', () => {
  it('should render properly', () => {
    const { container } = render(
      <Link>
        Click here
      </Link>,
    );

    expect(container).toMatchSnapshot();
  });
});
