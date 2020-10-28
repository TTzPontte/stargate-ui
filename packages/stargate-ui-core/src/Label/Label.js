import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

import Typography from '../Typography';

const styles = () => {
  const label = {
    display: 'inline-flex!important',
    alignItems: 'center',
    cursor: 'pointer',
  };

  return { label };
};

const Label = (props) => {
  const {
    children,
    className: inheritedClassName,
    ...factoryProps
  } = props;

  const [{ label }] = useStyles(styles);
  const classLabel = clsx(label, inheritedClassName);

  return (
    <Typography
      variant="body"
      {...factoryProps}
      element="label"
      children={children}
      className={classLabel}
    />
  );
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Label;
