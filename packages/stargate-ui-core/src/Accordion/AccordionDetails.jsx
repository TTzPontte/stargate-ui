import React from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Factory from '../Factory';
import AccordionContext from './AccordionContext';

const styles = () => {
  const details = {
    '&:not($detailsExpanded)': {
      height: 0,
      overflow: 'hidden',
    },
  };

  const detailsExpanded = {
    height: 'auto',
  };

  return { details, detailsExpanded };
};

const AccordionDetails = React.forwardRef((props, ref) => {
  const {
    children,
    className: inheritedClassName,
    ...factoryProps
  } = props;

  const { opened } = React.useContext(AccordionContext);

  const [
    {
      details,
      detailsExpanded,
    }
  ] = useStyles(styles);
  const classDetails = clsx(
    details,
    {
      [detailsExpanded]: opened,
    },
    inheritedClassName,
  );

  return (
    <Factory
      ref={ref}
      className={classDetails}
      {...factoryProps}
    >
      <Factory
        paddingX={2}
        paddingTop={1}
        paddingBottom={2}
        children={children}
      />
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
   * Add a new CSS class to `className` property.
   * @default undefined
   */
  className: PropTypes.string,
};

export default AccordionDetails;
