import { createElement } from 'react';
import PropTypes from 'prop-types';
import { useStyles } from '@pontte/stargate-ui-styles';

const styles = (theme) => {
  const {
    spacing,
  } = theme;

  const factory = {

  };

  return { factory };
};

const Factory = (props) => {
  const {
    children,
    element,
    ...elementProps
  } = props;
  /**
   * segundo argumento volta apenas valores??
   */
  const [classes] = useStyles(styles, {});
  // const className = clsx(Object.values(classes));

  /**
   * will accept props
   *
   * gutter as margin/padding
   * padding
   * margin
   * align
   */

  return createElement(element, { ...elementProps }, children);
};

Factory.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Factory;
