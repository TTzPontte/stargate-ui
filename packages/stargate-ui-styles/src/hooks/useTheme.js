import React from 'react';

import themeContext from '../Theme/ThemeContext';

const useTheme = () => {
  /**
   * Uses protected context from @module Theme to get theming
   * object defined.
   */
  const { theme } = React.useContext(themeContext);

  return theme;
};

export default useTheme;
