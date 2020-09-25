import * as React from 'react';
import deepmerge from 'deepmerge';
import resetJss from 'reset-jss';
import PropTypes from 'prop-types';

import useStyles from './hooks/useStyles';

const styles = ({ overrides: { Baseline = {} } }) => {
  const baseline = deepmerge.all([
    Baseline,
    resetJss,
    {
      '@global': {
        '*': {
          '-webkit-font-smoothing': 'antialiased',
        },
        body: {
          margin: 0,
          padding: 0,
        },
      },
    }
  ]);

  return { baseline };
};

const Baseline = ({ children = null }) => {
  useStyles(styles);

  return <React.Fragment children={children} />
};

Baseline.propTypes = {
  children: PropTypes.node,
};

export default Baseline;
