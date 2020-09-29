import createUseStyles from './createUseStyles';
import useTheme from './useTheme';

const useStyles = (forward, props) => ([
  createUseStyles(forward)({ theme: useTheme(), ...props })
]);

export default useStyles;
