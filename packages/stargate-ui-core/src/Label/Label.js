import React from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Typography } from '@pontte/stargate-ui-core';

const styles = () => {
  return {};
};

const Label = (props) => {
  const { children, ...typographyProps } = props;

  const [classes] = useStyles(styles, {});
  const className = clsx(classes);

  return (
    <Typography
      element="label"
      className={className}
      variant="body"
      children={children}
      {...typographyProps}
    />
  );
};

Label.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
};

export default Label;
