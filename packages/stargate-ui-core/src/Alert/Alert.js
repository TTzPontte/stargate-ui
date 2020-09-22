import React, { useState } from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

import Factory from '../Factory';
import Typography from '../Typography';
import { CloseRounded as SvgIconClose } from '@pontte/stargate-ui-icons';

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

  const getTextColor = ({ color }) => (
    color && palette[color][mode].text
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

  const alertContainer = {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'space-around',
  };

  const alertContainerItem = {
    flexBasis: 'auto',
  };

  const alertContained = {
    color: ({ disabled, ...props }) => (
      disabled ? setLightness(.8, getColor(props.color)) : getTextColor(props)
    ),
    backgroundColor: ({ disabled, ...props }) => (
      !disabled && setLightness(.94, getColor(props.color))
    ),
    backgroundColor: (props) => {
      const {
        disabled,
        color,
      } = props;
      return (disabled) ? setLightness(.95, getColor(color)) : (color !== 'default' ? setLightness(.80, getColor(color)) : palette.lighter)
    },
  };

  const alertClose = {
    border: 0,
    lineHeight: 0,
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: (props) => {
      const {
        disabled,
        color,
      } = props;
      return (disabled) ? setLightness(.85, getColor(color)) : getColor('primary')
    },
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
    alignItems: 'start',
    userSelect: 'none',
    color: ({ disabled, ...props }) => (
      disabled ? setLightness(.85, getColor(props.color)) : getColor('primary')
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
    disabled,
    large,
    componentAtStart,
    componentAtEnd,
    close : defaultValue = false,
    color = 'default',
    onClick = () => {},
    className: inheritedClasses,
    ...factoryProps
  } = props;

  const [
    {
      alert: classAlert,
      alertContained: classAlertContained,
      alertClose: classAlertClose,
      alertOrnament: classAlertOrnament,
      alertContainer: classAlertContainer,
      alertContainerItem: classAlertContainerItem,
      ...classes
    },
  ] = useStyles(styles, {
    color,
    disabled,
    close,
    contained,
  });

  const classAlertWrapper = clsx(
    classAlertContainer,
    classAlert,
    {
      [classAlertContained]: contained,
    }
  );

  console.log(classAlert);
  // const classAlertContainerItem = clsx({ classAlertContained: contained });

  // const className = clsx(
  //   Object.values(classes),
  //   {
  //     [classAlertContained]: contained,
  //     [classAlertClose]: close,
  //   },
  //   inheritedClasses,
  // );

  const typographyVariant = large ? 'body' : 'bodylower';
  const [close, setClose] = useState(defaultValue);

  const handleClose = () => {
    if (disabled) {
      return;
    }

    setClose(true);
    onClick();
  }

  const n = !large ? 1 : 1.2;
  const paddingY = (1.5 * n);
  const paddingX = (6 * n);


  return (
    <Factory
      element="div"
      className={classAlertWrapper}
      paddingX={paddingX}
      paddingY={paddingY}
      {...factoryProps}
    >
      <Factory
        element="div"
        className={classAlertContainerItem}
      >
        {componentAtStart && (
          <Factory
            element="span"
            className={classAlertOrnament}
            paddingRight={1}
            children={componentAtStart}
          />
        )}
      </Factory>

      <Factory
        element="div"
        className={classAlertContainerItem}
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
        >
          <Factory
            element="button"
            className={classAlertClose}
            aria-label="Close"
            paddingX={1}
            onClick={handleClose}
          >
            <SvgIconClose />
          </Factory>
        </Factory>
      )}
    </Factory>
  );
};

export default Alert;
