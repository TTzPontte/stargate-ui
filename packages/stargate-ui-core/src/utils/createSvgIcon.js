
import React from 'react';
import SvgIcon from '../SvgIcon';

/**
 * Private module reserved for @material-ui packages.
 */
export default (displayName, path) => {
  const Component = (props, ref) => (
    <SvgIcon data-testid={`${displayName}Icon`} ref={ref} {...props}>
      {path}
    </SvgIcon>
  );

  return React.memo(React.forwardRef(Component));
}
