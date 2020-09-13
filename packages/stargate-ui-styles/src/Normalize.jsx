import React from 'react';
import { create as createJss } from 'jss';
import { JssProvider, SheetsRegistry } from 'react-jss';
import jssPreset from 'jss-preset-default';
import resetJss from 'reset-jss';
import deepmerge from 'deepmerge';
import PropTypes from 'prop-types';

const jss = createJss();

jss.setup(jssPreset());

const Normalize = ({ children }) => {
  const sheetsRegistry = new SheetsRegistry();
  const cssGlobal = {
    '@global': {
      '*': {
        '-webkit-font-smoothing': 'antialiased',
      },
    },
  };
  const stylesheet = jss.createStyleSheet(
    deepmerge(
      resetJss,
      cssGlobal,
    )
  ).attach();

  sheetsRegistry.add(stylesheet);

  return (
    <JssProvider
      registry={sheetsRegistry}
      classNamePrefix="stargate-"
    >
      {children}
    </JssProvider>
  );
};

Normalize.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Normalize;
