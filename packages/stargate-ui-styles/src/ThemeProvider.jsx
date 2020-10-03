import React from 'react';
import { ThemeProvider as JssThemeProvider, JssProvider } from 'react-jss';
import PropTypes from 'prop-types';

const ThemeProvider = ({ theme, children }) => {
  const minify = false;
  // const minify = process.env.NODE_ENV === 'production';

  return (
    <JssProvider id={{minify}}>
      <JssThemeProvider
        theme={theme}
        children={children}
      />
    </JssProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object,
};

export default ThemeProvider;
