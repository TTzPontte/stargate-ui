import React from 'react';
import SvgIcon from '../../../stargate-ui-core/src/SvgIcon';

const createIconComponent = (name, path) => (
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

export default createIconComponent;
