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
  const {
    resets,
    transition,
    spacing,
  } = theme;

  const summary = {
    ...resets.button,
    width: '100%',
  };

  const summaryVariantDefault = {
    padding: [
      spacing(3),
      spacing(3),
      spacing(3),
      0,
    ],
  };

  const summaryVariantOutlined = {
    padding: spacing(2),
  };

  const summaryIcon = {
    transition: transition('transform').ease,
    transform: 'rotate(0)',
  };

  const summaryIconActive = {
    transform: 'rotate(-90deg)',
  };

  return {
    summary,
    summaryIcon,
    summaryIconActive,
    summaryVariantDefault,
    summaryVariantOutlined,
  };
};

const AccordionSummary = React.forwardRef((props, ref) => {
  const {
    children,
    className: inheritedClassName,
    color: inheritedColor = 'primary',
    ...factoryProps
  } = props;

  const {
    opened,
    onToggle,
    variant,
    color: accordionColor,
  } = React.useContext(AccordionContext);
  const color = inheritedColor || accordionColor || 'primary';

  const [classes] = useStyles(styles);
  const classSummary = clsx(
    classes.summary,
    {
      [classes.summaryVariantDefault]: !variant,
      [classes.summaryVariantOutlined]: variant === 'outlined',
    },
    inheritedClassName,
  );
  const classSummaryIcon = clsx(classes.summaryIcon, { [classes.summaryIconActive]: opened });

  return (
    <Factory
      {...factoryProps}
      ref={ref}
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
          >
            {children}
          </Typography>
        </Grid>

        <Grid
          col
          xs="auto"
          alignItems="center"
        >
          <ArrowFlatRight className={classSummaryIcon} color="success" />
        </Grid>
      </Grid>
    </Factory>
  );
});

AccordionSummary.displayName = 'AccordionSummary';

AccordionSummary.propTypes = {
  /**
   * Add DOM element. Can be a React component or HTML element.
   */
  children: PropTypes.node.isRequired,
  /**
   * Add a new CSS class.
   *
   * **@default** `undefined`
   */
  className: PropTypes.string,
  /**
   * Add typography CSS color. Can inherit color from **@module** `Accordion`.
   *
   * **@default** `primary`
   */
  color: PropTypes.oneOf(['primary']),
  /**
   * Accept properties from **@module** `Factory`.
   */
  '...props': PropTypes.any,
};

export default AccordionSummary;
