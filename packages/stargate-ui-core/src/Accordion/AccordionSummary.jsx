import React from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Factory from '../Factory';
import Typography from '../Typography';
import Grid from '../Grid';
import AccordionContext from './AccordionContext';
/**
 * @todo change location to @pontte/stargate-ui-icons when has been fixed
 */
import { ArrowFlatRight } from '../icons';

const styles = (theme) => {
  const { resets, transition } = theme;

  const summary = {
    ...resets.button,
    width: '100%',
  };

  const summaryIcon = {
    transition: transition('transform').ease,
    transform: ({ opened }) => (
      opened ? 'rotate(-90deg)' : 'rotate(0)'
    ),
  };

  return {
    summary,
    summaryIcon,
  };
};

const AccordionSummary = React.forwardRef((props, ref) => {
  const {
    children,
    className: inheritedClassName,
    color = 'primary',
    ...typographyProps
  } = props;

  const { opened, onToggle } = React.useContext(AccordionContext);

  const [{ summary, summaryIcon: classSummaryIcon }] = useStyles(styles, { opened });
  const classSummary = clsx(summary, inheritedClassName);

  return (
    <Factory
      ref={ref}
      paddingX={2}
      paddingY={2}
      {...typographyProps}
      className={classSummary}
      type="button"
      element="button"
      onClick={onToggle}
    >
      <Grid
        row
        alignItems="center"
        spacing={2}
      >
        <Grid col xs>
          <Typography
            weight="bold"
            color={color}
            gutter={0}
            children={children}
          />
        </Grid>

        <Grid
          col
          xs="auto"
          alignItems="center"
        >
          <ArrowFlatRight
            className={classSummaryIcon}
            color="success"
          />
        </Grid>
      </Grid>
    </Factory>
  );
});

AccordionSummary.displayName = 'Accordion.Summary';

AccordionSummary.propTypes = {
  /**
   * Add DOM element. Can be a React component or HTML element.
   */
  children: PropTypes.node.isRequired,
  /**
   * Add a new CSS class to `className` property.
   * @default undefined
   */
  className: PropTypes.string,
  /**
   * @borrows Color.propTypes.color as Typography.propTypes.color
   * @default primary
   */
  color: Typography.propTypes.color,
};

/**
 * Add @property {object} defaultProps made available properties information
 * for Props in the Storybook but do not use as major define for default properties.
 */
AccordionSummary.defaultProps = {
  color: 'primary',
};

export default AccordionSummary;
