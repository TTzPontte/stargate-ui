import React from 'react';
import { SvgIcon } from '@pontte/stargate-ui-core';

const createSvgIcon = (name, path) => (
  React.memo(
    React.forwardRef((props, ref) => (
      <SvgIcon
        ref={ref}
        name={name}
        children={path}
        {...props}
      />
    ))
  )
);

export default createSvgIcon;
