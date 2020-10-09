import React, { Fragment } from 'react';
import deepmerge from 'deepmerge';
import PropTypes from 'prop-types';
import resetJss from 'reset-jss';

import { useStyles } from '@pontte/stargate-ui-styles';

const styles = (theme) => {
  const { overrides: { Baseline = {} } } = theme;

  return deepmerge.all([
    resetJss,
    {
      '@global': {
        html: {
          fontSize: '62.5%',
          boxSizing: 'border-box',
          WebkitTextSizeAdjust: '100%',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '*, *::before, *::after': {
          boxSizing: 'inherit',
        },
        body: {
          margin: 0,
        },
        'strong, b': {
          fontWeight: 'bold',
        },
      },
    },
    Baseline,
  ]);
};

const Baseline = ({ children = null }) => {
  useStyles(styles);

  return <Fragment children={children} />
};

Baseline.propTypes = {
  children: PropTypes.node,
};

export default Baseline;
