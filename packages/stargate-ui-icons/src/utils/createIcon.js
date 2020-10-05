import React from 'react';
import { SvgIcon, Theme } from '@pontte/stargate-ui-core';

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
