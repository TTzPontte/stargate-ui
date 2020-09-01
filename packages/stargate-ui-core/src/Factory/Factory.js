import { createElement } from 'react';
import PropTypes from 'prop-types';

const Factory = (props) => {
  const {
    children,
    type = 'div',
    ...elementProps
  } = props;

  return createElement(type, { ...elementProps }, children);
};

Factory.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};

export default Factory;
