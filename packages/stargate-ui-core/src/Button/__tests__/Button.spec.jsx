import React from 'react';

import Button from '../Button';

describe('Button', () => {
  it('should render properly', () => {
    const { container } = render(
      <Button>
        Click here
      </Button>,
    );

    expect(container).toMatchSnapshot();
  });
});
