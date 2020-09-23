import PropTypes from "prop-types";
import React, { useState } from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

import Factory from '../Factory';
import Typography from '../Typography';
import { Close as SvgIconClose } from '@pontte/stargate-ui-icons';
import { Warning as SvgIconWarning } from '@pontte/stargate-ui-icons';
import { Info as SvgIconInfo } from '@pontte/stargate-ui-icons';
import { Error as SvgIconError } from '@pontte/stargate-ui-icons';
import { Success as SvgIconSuccess } from '@pontte/stargate-ui-icons';

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

const Alert = (props) => {
  const {
    children,
    contained,
    large,
    icon,
    severity,
    close,
    onClick = () => {},
    ...factoryProps
  } = props;

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
    }
  );

  const typographyVariant = large ? 'body' : 'bodylower';


  const handleClose = () => {
    setClose(!isClosed);
    onClick();
  }

  let showIcon = true;

  if (icon) {
    showIcon = false;
  }

  const whichIconBySeverity = (props) => {
    const { severity } = props;

    if (severity === 'warning') {
      return <SvgIconWarning className={classAlertOrnament} color="warning"/>;
    }

    if (severity === 'info') {
      return <SvgIconInfo className={classAlertOrnament} color="info"/>;
    }

    if (severity === 'error') {
      return <SvgIconError className={classAlertOrnament} color="error"/>;
    }

    if (severity === 'success') {
      return <SvgIconSuccess className={classAlertOrnament} color="success"/>;
    }

    return <SvgIconInfo className={classAlertOrnament}/>;
  };

  return (
    <Factory
      element="div"
      className={classAlertWrapper}
      paddingX={.5}
      {...factoryProps}
    >
      <Factory
        element="div"
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
          whichIconBySeverity(props)
        )}
      </Factory>

      <Factory
        element="div"
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
          element="div"
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
};

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
}

export default Alert;
