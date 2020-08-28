import React from 'react';
import jss from 'jss';
import { JssProvider, SheetsRegistry } from 'react-jss';
import resetJss from 'reset-jss';
import deepmerge from 'deepmerge';
import PropTypes from 'prop-types';

const Normalize = ({ children }) => {
  const sheetsRegistry = new SheetsRegistry();

  const cssGlobalCommon = { height: '100%' };
  const cssGlobal = jss
    .createStyleSheet(
      deepmerge(resetJss, {
        '@global': {
          html: cssGlobalCommon,
          body: cssGlobalCommon,
          '#root': cssGlobalCommon,
        },
      })
    )
    .attach();

  sheetsRegistry.add(cssGlobal);

  return (
    <JssProvider registry={sheetsRegistry} classNamePrefix="stargate-">
      {children}
    </JssProvider>
  );
};

Normalize.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Normalize;
