import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@pontte/stargate-ui-core';
import { useStyles } from '@pontte/stargate-ui-styles';

const styles = () => {
  const label = {
    display: 'inline-flex',
    alignItems: 'center',
  };

  return { label };
};

const Label = (props) => {
  const { children, ...factoryProps } = props;
  const [{ label: classLabel }] = useStyles(styles);

  return (
    <Typography
      element="label"
      variant="body"
      children={children}
      className={classLabel}
      {...factoryProps}
    />
  );
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Label;
