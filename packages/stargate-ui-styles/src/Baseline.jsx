import * as React from 'react';
import deepmerge from 'deepmerge';
import PropTypes from 'prop-types';
import resetJss from 'reset-jss';

import useStyles from './hooks/useStyles';

const styles = ({ overrides: { Baseline = {} } }) =>
  deepmerge.all([
    Baseline,
    resetJss,
    {
      '@global': {
        html: {
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
    }
  ]);

const Baseline = ({ children = null }) => {
  useStyles(styles);

  return <React.Fragment children={children} />
};

Baseline.propTypes = {
  children: PropTypes.node,
};

export default Baseline;
