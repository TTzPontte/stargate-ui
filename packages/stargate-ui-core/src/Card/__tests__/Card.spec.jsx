import React from 'react';

import Card from '../Card';

describe('Card', () => {
  it('should render properly', () => {
    const { container } = render(
      <Card clickable>
        Click
      </Card>,
    );

    expect(container).toMatchSnapshot();
  });
});
