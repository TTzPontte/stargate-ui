import React from 'react';

import Svg from '../../Svg';

describe('Svg', () => {
  it('should render properly', () => {
    const { container } = render(
      <Svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 1C5.8 1 1 5.8 1 12s4.9 11 11 11 11-4.9 11-11S18.2 1 12 1zm4.2 14.2c.3.3.3.7 0 1 0 .1-.3.3-.4.3-.1 0-.4 0-.6-.1L12 13.1l-3.3 3.2c-.1 0-.3.1-.4.1-.1 0-.4 0-.6-.1-.3-.3-.3-.7 0-1l3.3-3.2-3.3-3.3c-.3-.3-.3-.7 0-1s.7-.3 1 0L12 11l3.2-3c.3-.3.7-.3 1 0 .3.3.3.7 0 1L13 12.1l3.2 3.1z"/>
        </svg>
      </Svg>,
    );

    expect(container).toMatchSnapshot();
  });
});