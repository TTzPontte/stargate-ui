import * as React from 'react';
import { ThemeProvider as Provider, JssProvider } from 'react-jss';
import PropTypes from 'prop-types';

const ThemeProvider = ({ theme, children }) => (
  <Provider theme={theme}>
    <JssProvider
      classNamePrefix="stargate-"
      children={children}
    />
  </Provider>
);

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object,
};

export default ThemeProvider;
