import PropTypes from "prop-types";
import React, { useState, useRef } from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

import Factory from '../Factory';
import Typography from '../Typography';
import { CloseFlat as SvgIconClose } from '../icons';
import { Warning as SvgIconWarning } from '../icons';
import { Info as SvgIconInfo } from '../icons';
import { Error as SvgIconError } from '../icons';
import { Success as SvgIconSuccess } from '../icons';

const styles = (theme) => {
  /**
   * @todo improve dynamic properties
   */
  const {
    active,
    palette,
    border,
    radius,
    mode,
  } = theme;
  const { setLightness } = palette;

  const getColor = (color) => (
    palette?.[color][mode].color
  );

  const alert = {
    border: [[...border, 'transparent']],
    borderRadius: radius(),
    cursor: 'pointer',
    outline: 'none',
    boxShadow: [[0, 3, 4, palette.medium]],
    pointerEvents: ({ disabled }) => (
      disabled && 'none'
    ),
  };

  /**
   * @todo remove after implements <Grid>
   */

  const alertContainer = {
    display: ({ isClosed }) => (
      isClosed ? 'none' : 'flex'
    ),
    alignItems: 'center',
    alignContent: 'space-around',
  };

  /**
   * @todo remove after implements <Grid>
   */

  const alertContainerItem = {
    flex: [[1, 'auto']],
    '&:nth-child(2)': {
      flexBasis: '100%',
    },
  };

  const alertContained = {
    color: ({ severity }) => (
      severity ? getColor(severity) : palette.darkest
    ),
    backgroundColor: ({ severity }) => (
      severity ? setLightness(.95, getColor(severity)) : palette.lighter
    ),
  };

  const alertClose = {
    border: 0,
    lineHeight: 0,
    position: 'relative',
    top: 5,
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    alignItems: 'center',
    color: ({ severity }) => (
      severity ? getColor(severity) : palette.darkest
    ),
    [active()]: {
      /**
       * @todo find an accessible solution
       */
      outline: 'none',
      /**
       * @todo add support for transitions in ui-core
       */
      opacity: .8,
    },
    '& svg': {
      width: 12,
    }
  };

  const alertOrnament = {
    display: 'inline-flex',
    alignItems: 'center',
    userSelect: 'none',
    color: ({ severity }) => (
      severity ? getColor(severity) : getColor('info')
    ),
  };

  return {
    alert,
    alertContainer,
    alertContained,
    alertContainerItem,
    alertClose,
    alertOrnament,
  };
};

const Alert = React.forwardRef((props, ref) => {
  const {
    children,
    contained,
    large,
    icon,
    severity,
    close,
    onClick = () => {},
    className: inheritedClassName,
    ...factoryProps
  } = props;
  const innerRef = useRef(ref);

  const [isClosed, setClose] = useState(false);

  const [
    {
      alert: classAlert,
      alertContained: classAlertContained,
      alertClose: classAlertClose,
      alertOrnament: classAlertOrnament,
      alertContainer: classAlertContainer,
      alertContainerItem: classAlertContainerItem,
    },
  ] = useStyles(styles, {
    close,
    contained,
    severity,
    isClosed
  });

  const classAlertWrapper = clsx(
    classAlertContainer,
    classAlert,
    {
      [classAlertContained]: contained,
    },
    inheritedClassName,
  );

  const typographyVariant = large ? 'body' : 'bodylower';

  const handleClose = () => {
    setClose(!isClosed);
    onClick();
  };

  let showIcon = true;

  if (icon) {
    showIcon = false;
  };

  const getIconBySeverity = (props) => {
    const { severity } = props;

    switch (severity) {
      case 'warning':
        return <SvgIconWarning className={classAlertOrnament} color="warning"/>;
      case 'info':
        return <SvgIconInfo className={classAlertOrnament} color="info"/>;
      case 'error':
        return<SvgIconError className={classAlertOrnament} color="error"/>;
      case 'success':
        return<SvgIconSuccess className={classAlertOrnament} color="success"/>;
      default:
        return <SvgIconInfo className={classAlertOrnament}/>;
    };
  };

  return (
    <Factory
      ref={innerRef}
      className={classAlertWrapper}
      paddingX={.5}
      {...factoryProps}
    >
      <Factory
        className={classAlertContainerItem}
        paddingX={.5}
        paddingY={1}
      >
        {icon && (
          <Factory
            element="span"
            className={classAlertOrnament}
            children={icon}
          />
        )}

        {showIcon && (
          getIconBySeverity(props)
        )}
      </Factory>

      <Factory
        className={classAlertContainerItem}
        paddingX={.5}
        paddingY={1}
      >
        <Typography
          element="span"
          variant={typographyVariant}
          gutter={0}
          children={children}
        />
      </Factory>

      {close && (
        <Factory
          className={classAlertContainerItem}
          paddingX={.5}
          paddingY={1}
        >
          <Factory
            element="button"
            className={classAlertClose}
            aria-label="Close"
            onClick={handleClose}
          >
            <SvgIconClose />
          </Factory>
        </Factory>
      )}
    </Factory>
  );
});

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  close: PropTypes.bool,
  contained: PropTypes.bool.isRequired,
  large: PropTypes.bool,
  onClick: PropTypes.func,
  severity: PropTypes.oneOf([
    'info',
    'success',
    'warning',
    'error',
  ]),
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
};

export default Alert;
