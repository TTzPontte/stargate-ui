import React from 'react';

import Typography from '../Typography';

describe('Typography', () => {
  it('should render properly', () => {
    const { container } = render(
      <Typography>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis id nemo dicta! Soluta voluptate cupiditate corrupti architecto rerum nisi excepturi sunt quaerat iste quibusdam, non nam possimus ut eveniet.
      </Typography>,
    );

    expect(container).toMatchSnapshot();
  });
});
