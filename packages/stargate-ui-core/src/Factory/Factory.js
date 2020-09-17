import { createElement } from 'react';
import PropTypes from 'prop-types';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

const styles = (theme) => {
  const {
    spacing,
  } = theme;

  const factory = {
    margin: (props) => {
      const {
        marginTop,
        marginBottom,
        marginLeft,
        marginRight
      } = props;

      return [
        [
          marginTop,
          marginRight,
          marginBottom,
          marginLeft
        ].map(spacing),
      ];
    },
  };

  return { factory };
};

const Factory = (props) => {
  const {
    children,
    gutter,
    element = 'div',
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
    marginLeft = 0,
    className: inheritedClassName,
    ...elementProps
  } = props;
  /**
   * segundo argumento volta apenas valores??
   */
  const [classes] = useStyles(styles, {
    marginTop,
    marginRight,
    marginBottom,
    marginLeft
  });
  const className = clsx(Object.values(classes), inheritedClassName);

  /**
   * will accept props
   *
   * gutter as margin/padding
   * padding
   * margin
   * align
   */

  return createElement(element, { className, ...elementProps }, children);
};

Factory.propTypes = {
  children: PropTypes.node,
};

export default Factory;
