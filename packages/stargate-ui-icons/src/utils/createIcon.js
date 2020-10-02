import React from 'react';
import { SvgIcon } from '@pontte/stargate-ui-core';
import { Theme } from '@pontte/stargate-ui-styles';

const createIconComponent = (name, path) => (
  React.memo(
    React.forwardRef((props, ref) => (
      <Theme>
        <SvgIcon
          ref={ref}
          name={name}
          children={path}
          {...props}
        />
      </Theme>
    ))
  )
);

export default createIconComponent;
