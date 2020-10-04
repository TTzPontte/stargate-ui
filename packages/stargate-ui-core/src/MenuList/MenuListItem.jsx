import React from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

import Factory from '../Factory';

const styles = () => {
  return {

  };
};

const MenuList = (props) => {
  const {
    ...factoryProps
  } = props;

  const [classes] = useStyles(styles, {});
  const className = clsx(classes);

  return (
    <Factory
      {...factoryProps}
      paddingY={.5}
      className={className}
    />
  );
};

export default MenuList;
