import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

import Factory from '../Factory';

const Count = React.forwardRef((props, ref) => {
  const {
    delay = 0,
    duration = 5,
    separator = '.',
    decimals = 2,
    decimal = ',',
    children: inheritedChildren,
    ...factoryProps
  } = props;

  const parsedChildren = inheritedChildren.split(/(\d*\.?\d*\,?\d*)/g);
  const children = parsedChildren.map((str) => {
    if (!/^\d/g.test(str)) {
      return str;
    }

    const number = str.replace(/[^\d\,]/g, '');
    const end = parseInt(number);

    return (
      <CountUp
        start={0}
        end={end}
        delay={delay}
        duration={duration}
        separator={separator}
        decimals={decimals}
        decimal={decimal}
      />
    );
  });

  return (
    <Factory
      ref={ref}
      element="span"
      {...factoryProps}
    >
      {children.map((str, i) => (
        <React.Fragment key={i}>
          {str}
        </React.Fragment>
      ))}
    </Factory>
  );
});

Count.displayName = 'Count';

Count.propTypes = {
  /**
   * Add string node.
   */
  children: PropTypes.string.isRequired,
  /**
   * Add delay in seconds before start.
   * @see {@link https://github.com/glennreyes/react-countup#delay-number}
   * @default 0
   */
  delay: PropTypes.number,
  /**
   * Add animation duration in seconds.
   * @see {@link https://github.com/glennreyes/react-countup#duration-number}
   * @default 0
   */
  duration: PropTypes.number,
  /**
   * Add character of thousands separator.
   * @see {@link https://github.com/glennreyes/react-countup#separator-string}
   * @default '.'
   */
  separator: PropTypes.string,
  /**
   * Add decimal character.
   * @see {@link https://github.com/glennreyes/react-countup#decimal-string}
   * @default ','
   */
  decimal: PropTypes.string,
  /**
   * Add amount of decimals.
   * @see {@link https://github.com/glennreyes/react-countup#decimals-number}
   * @default 2
   */
  decimals: PropTypes.number,
  /**
   * Add any props allowed in Factory or default props of HTML.
   */
  '...props': PropTypes.object,
};

/**
 * Add @property {object} defaultProps made available properties information
 * for Props in the Storybook but do not use as major define for default properties.
 */
Count.defaultProps = {
  duration: 5,
  separator: '.',
  decimals: 2,
  decimal: ',',
};

export default Count;
