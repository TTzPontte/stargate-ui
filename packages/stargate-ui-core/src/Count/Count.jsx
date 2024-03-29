import React from 'react';
import PropTypes from 'prop-types';
import { CountUp } from 'countup.js';

import Factory from '../Factory';

const Count = React.forwardRef((props, ref) => {
  const {
    onChange,
    delay = 0,
    duration = 5,
    decimals: decimalPlaces = 2,
    children = '',
    style = 'decimal',
    currency = 'BRL',
    locale: numberFormatLocale = 'pt-BR',
    ...factoryProps
  } = props;

  const innerRef = React.useRef(ref);

  const number = children
      /**
       * Remove non-numeric and non-comma character.
       */
      .replace(/[^\d\,]/g, '')
      /**
       * Replace comma for dot.
       */
      .replace(/\,/, '.');
  const end = parseFloat(number);

  const handleFormat = (n) => {
    if (onChange) {
      onChange({}, n);
    }

    const numberFormatOptions = { style, minimumFractionDigits: decimalPlaces };

    if (style === 'currency' && currency) {
      numberFormatOptions.currency = currency;
    }
    /**
     * @todo create format component or utils.
     */
    const valueFormatted = new Intl.NumberFormat(numberFormatLocale, numberFormatOptions).format(n);

    return valueFormatted;
  }

  React.useEffect(() => {
    const countUp = new CountUp(
      innerRef?.current,
      end,
      {
        duration,
        decimalPlaces,
        startVal: 0,
        formattingFn: handleFormat,
      },
    );

    const timeout = setTimeout(() => {
      countUp.start();
    }, duration);

    return () => clearTimeout(timeout);
  }, [end, innerRef.current]);


  return (
    <Factory element="span" {...factoryProps}>
      <span ref={innerRef}>
        {end}
      </span>
    </Factory>
  );
});

Count.displayName = 'Count';

Count.propTypes = {
  /**
   * Add string node. It does not work DOM elements or React components.
   */
  children: PropTypes.string,
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
   * Add amount of decimals. It used by both CountUp and Intl.NumberFormat.
   * @see {@link https://github.com/glennreyes/react-countup#decimals-number}
   * @see {@link https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat}
   * @default 2
   */
  decimals: PropTypes.number,
  /**
   * Trigger when children animation is changing.
   * @default undefined
   */
  onChange: PropTypes.func,
  /**
   * Add format style. It used by Intl.NumberFormat and accepts its specified values.
   * @see {@link https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat}
   * @default 'decimal'
   */
  style: PropTypes.oneOf([
    'decimal',
    'percent',
    'currency',
  ]),
  /**
   * Add currency format. It used by Intl.NumberFormat and accepts its specified values.
   * @see {@link https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat}
   * @default 'BRL'
   */
  currency: PropTypes.string,
  /**
   * Add locale format. It used by Intl.NumberFormat and accepts its specified values.
   * @see {@link https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat}
   * @default 'pt-BR'
   */
  locale: PropTypes.string,
  /**
   * Add any props allowed in Factory or default props of HTML.
   */
  // '...props': PropTypes.object,
};

export default Count;
