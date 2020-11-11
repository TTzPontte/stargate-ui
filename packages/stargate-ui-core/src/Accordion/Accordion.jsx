import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

import AccordionSummary from './AccordionSummary';
import AccordionDetails from './AccordionDetails';
import AccordionContext from './AccordionContext';
import Factory from '../Factory';

const styles = (theme) => {
  const {
    palette,
    mode,
    radius,
    spacing,
  } = theme;

  const borderStyle = [
    1,
    'solid',
    palette.default[mode].color,
  ];

  const accordionVariantDefault = {
    borderBottom: borderStyle,
  };

  const accordionVariantOutlined = {
    border: borderStyle,
    borderRadius: radius(),
    marginBottom: spacing(2),
  };

  const accordionColorPrimary = {
    borderColor: palette.primary[mode].color,
  };

  return {
    accordionVariantDefault,
    accordionVariantOutlined,
    accordionColorPrimary,
  };
};

const Accordion = React.forwardRef((props, ref) => {
  const {
    onClick,
    controller,
    variant,
    color,
    children: inheritedChildren,
    className: inheritedClassName,
    opened: inheritedOpened = false,
    ...factoryProps
  } = props;

  const children = React.Children.toArray(inheritedChildren);
  const [opened, setOpened] = React.useState(inheritedOpened);

  if (controller) {
    React.useEffect(() => {
      setOpened(inheritedOpened);
    }, [inheritedOpened]);
  }

  const handleToggle = React.useCallback(
    (event) => {
      if (!controller) {
        setOpened(!opened);
      }

      if (onClick) {
        onClick(event, [
          controller,
          controller ? inheritedOpened : opened,
        ]);
      }
    },
    [inheritedOpened, opened],
  );

  const context = React.useMemo(() => ({
    color,
    opened,
    variant,
    onToggle: handleToggle,
  }), [
    color,
    opened,
    variant,
    onClick,
  ]);

  const [classes] = useStyles(styles);
  const classAccordion = clsx(
    {
      [classes.accordionVariantDefault]: !variant,
      [classes.accordionVariantOutlined]: variant == 'outlined',
      [classes.accordionColorPrimary]: color === 'primary',
    },
    inheritedClassName,
  );

  return (
    <Factory {...factoryProps} className={classAccordion}>
      <AccordionContext.Provider value={context}>
        {children}
      </AccordionContext.Provider>
    </Factory>
  );
});

Accordion.displayName = 'Accordion';

Accordion.propTypes = {
  /**
   * Add component dependencies.
   */
  children: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf([AccordionSummary, AccordionDetails]),
  })).isRequired,
  /**
   * Trigger when **@module** `AccordionSummary` is clicked.
   *
   * @param {object} event Default click event
   * @param {array} controller Name of clicked accordion and its state
   *
   * **@default** `undefined`
   */
  onClick: PropTypes.func,
  /**
   * Add controller name and if `onClick` is defined, is returned it name
   * to control accordion individually.
   *
   * **@default** `undefined`
   */
  controller: PropTypes.string,
  /**
   * Add state of accordion.
   *
   * **@default** `false`
   */
  opened: PropTypes.bool,
  /**
   * Add border color.
   *
   * **@default** `undefined`
   */
  color: PropTypes.oneOf(['primary']),
  /**
   * Accept properties from **@module** `Factory`.
   */
  '...props': PropTypes.any,
};

export default Accordion;
