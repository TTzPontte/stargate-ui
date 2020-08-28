import { createUseStyles } from 'react-jss';

import useTheme from './useTheme';

const useStyles = (forward, { theme = useTheme(), ...props } = {}) =>
  createUseStyles(forward)({ theme, ...props });

export default useStyles;
