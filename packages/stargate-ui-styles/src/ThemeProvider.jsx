import React from 'react';
import { ThemeProvider as JssThemeProvider, JssProvider } from 'react-jss';
import PropTypes from 'prop-types';

const ThemeProvider = (props) => {
  const {
    theme,
    prefix,
    children,
  } = props;
  const minify = false;
  // const minify = process.env.NODE_ENV === 'production';

  return (
    <JssProvider
      id={{minify}}
      classNamePrefix={`${prefix}-`}
    >
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
