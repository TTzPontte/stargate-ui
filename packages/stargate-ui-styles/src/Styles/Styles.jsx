import PropTypes from 'prop-types';

import { useStyles } from '../hooks';

const Styles = (props) => {
  const { children, use } = props;
  const classes = useStyles(...use);

  return children(classes);
};

Styles.displayName = 'Styles';

Styles.propTypes = {
  /**
   * Return function with classes as children.
   */
  children: PropTypes.func.isRequired,
  /**
   * Add array with properties for use of `useStyles`.
   *
   * @param {Function} styles
   * @param {Object} props
   * @return {Array}
   */
  styles: PropTypes.shape([
    PropTypes.func.isRequired,
    PropTypes.object,
  ]),
};

export default Styles;
