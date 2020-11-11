import React from 'react';
import PropTypes from 'prop-types';

import PictureSource from './PictureSource';

const Picture = ({ children, ...props }) => (
  <picture {...props}>
    {children}
  </picture>
);

Picture.displayName = 'Picture';

Picture.propTypes = {
  /**
   * Add children.
   */
  children: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf([PictureSource]),
  })).isRequired,
  /**
   * Add properties to `picture` element.
   */
  '...props': PropTypes.any
};

export default Picture;
