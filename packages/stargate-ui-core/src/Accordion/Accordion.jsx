import React from 'react';
import PropTypes from 'prop-types';

import AccordionSummary from './AccordionSummary';
import AccordionDetails from './AccordionDetails';
import AccordionContext from './AccordionContext';
import Card from '../Card';

const Accordion = React.forwardRef((props, ref) => {
  const {
    children: defaultChildren,
    onClick,
    controller,
    opened: defaultOpened = false,
    ...cardProps
  } = props;

  const children = React.Children.toArray(defaultChildren);
  const [opened, setOpened] = React.useState(defaultOpened);

  if (controller) {
    React.useEffect(() => {
      setOpened(defaultOpened);
    }, [defaultOpened]);
  }

  const handleToggle = React.useCallback(
    (event) => {
      if (!controller) {
        setOpened(!opened);
      }

      if (onClick) {
        onClick(event, [
          controller,
          controller ? defaultOpened : opened,
        ]);
      }
    },
    [defaultOpened, opened],
  );

  const context = React.useMemo(() => ({
    opened,
    onToggle: handleToggle,
  }), [
    opened,
    onClick,
  ]);

  return (
    <Card
      {...cardProps}
      marginBottom={2}
      paddingX={0}
      paddingY={0}
      borderColor="primary"
    >
      <AccordionContext.Provider
        value={context}
        children={children}
      />
    </Card>
  );
});

Accordion.Summary = AccordionSummary;
Accordion.Details = AccordionDetails;

Accordion.displayName = 'Accordion';

Accordion.propTypes = {
  /**
   * Add component dependencies.
   */
  children: PropTypes.oneOfType([
    PropTypes.instanceOf(Accordion.Summary),
    PropTypes.instanceOf(Accordion.Details),
  ]).isRequired,
  /**
   * Trigger when `Accordion.Summary` is clicked.
   *
   * @param {object} event Default click event
   * @param {array} controller Name of clicked accordion and its state
   *
   * @default undefined
   */
  onClick: PropTypes.func,
  /**
   * Add controller name and if `onClick` is defined, is returned it name
   * to control accordion individually.
   * @default undefined
   */
  controller: PropTypes.string,
  /**
   * Add state of accordion.
   * @default false
   */
  opened: PropTypes.bool,
};

/**
 * Add @property {object} defaultProps made available properties information
 * for Props in the Storybook but do not use as major define for default properties.
 */
Accordion.defaultProps = {
  opened: false,
};

export default Accordion;
