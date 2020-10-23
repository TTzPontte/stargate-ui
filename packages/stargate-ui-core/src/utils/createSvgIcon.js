
import React from 'react';
import SvgIcon from '../SvgIcon';

export default (name, path) => {
  const Component = (props, ref) => {
    return (
      <SvgIcon
        ref={ref}
        {...props}
        children={path}
      />

    )
  };

  Component.displayName = name;

  return React.memo(React.forwardRef(Component));
}
