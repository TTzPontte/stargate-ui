import React from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Factory from '../Factory';
import AccordionContext from './AccordionContext';

const styles = ({ spacing }) => {
  const details = {
    /**
     * @todo remove `!important` when fix context conflict
     */
    margin: '0!important',
    '&:not($detailsExpanded)': {
      height: 0,
      overflow: 'hidden',
    },
  };
  /**
   * Do not remove.
   */
  const detailsContent = {};

  const detailsExpanded = {
    height: 'auto',
  };

  const detailsVariantDefault = {
    '& > $detailsContent': {
      /**
       * Need to be same value from CSS padding of {@file ./AccordionSummary}
       */
      paddingBottom: spacing(3),
    },
  };

  const detailsVariantOutlined = {
    padding: [
      0,
      spacing(2),
    ],
    '& > $detailsContent': {
      /**
       * Need to be same value from CSS padding of {@file ./AccordionSummary}
       */
      paddingBottom: spacing(2),
    },
  };

  return {
    details,
    detailsContent,
    detailsExpanded,
    detailsVariantOutlined,
    detailsVariantDefault,
  };
};

const AccordionDetails = React.forwardRef((props, ref) => {
  const {
    children,
    className: inheritedClassName,
    ...factoryProps
  } = props;

  const { opened, variant } = React.useContext(AccordionContext);

  const [{ detailsContent: classDetailsContent, ...classes }] = useStyles(styles);
  const classDetails = clsx(
    classes.details,
    {
      [classes.detailsExpanded]: opened,
      [classes.detailsVariantDefault]: !variant,
      [classes.detailsVariantOutlined]: variant === 'outlined',
    },
    inheritedClassName,
  );

  return (
    <Factory
      {...factoryProps}
      ref={ref}
      className={classDetails}
    >
      <div className={classDetailsContent}>
        {children}
      </div>
    </Factory>
  );
});

AccordionDetails.displayName = 'AccordionDetails';

AccordionDetails.propTypes = {
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
   * Accept properties from **@module** `Factory`.
   */
  '...props': PropTypes.any,
};

export default AccordionDetails;
