import { createUseStyles } from 'react-jss';
import useTheme from './useTheme'

const useStyles = (styles, props) => {
  const theme = useTheme();

  return [
    createUseStyles(styles)({ theme, ...props }),
  ];
};

export default useStyles;
