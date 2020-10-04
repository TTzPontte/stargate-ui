import React from 'react';
// import { SvgIcon } from '@pontte/stargate-ui-core';

const createIconComponent = (name, path) => (
  React.memo(
    React.forwardRef((props, ref) => (
      null
      // <SvgIcon
      //   ref={ref}
      //   name={name}
      //   children={path}
      //   {...props}
      // />
    ))
  )
);

export default createIconComponent;
