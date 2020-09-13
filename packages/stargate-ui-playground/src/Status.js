import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useStyles } from '@pontte/stargate-ui-styles';
import { Typography } from '@pontte/stargate-ui-core';

const STATUS_TYPE_RC = 'rc';
const STATUS_TYPE_STABLE = 'stable';
const STATUS_TYPE_DEPRECATED = 'deprecated';
const STATUS_TYPE_EXPERIMENTAL = 'experimental';

const styles = (theme) => {
  const {
    spacing,
    radius,
    palette,
    mode,
  } = theme;

  const borderRadius = radius();
  const badgeCommon = {
    border: [[1, 'solid']],
    padding: [[spacing(.5), spacing()]],
  };

  const color = {
    [STATUS_TYPE_RC]: 'warning',
    [STATUS_TYPE_STABLE]: 'success',
    [STATUS_TYPE_DEPRECATED]: 'error',
    [STATUS_TYPE_EXPERIMENTAL]: 'info',
  };

  const backgroundColor = ({ type }) => palette[color[type]][mode].color;
  const textColor = ({ type }) => palette[color[type]][mode].text;

  return {
    badge: {
      display: 'inline-block',
      borderRadius: radius(),
      marginBottom: spacing(2),
    },
    badgeColor: {
      ...badgeCommon,
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      backgroundColor: backgroundColor,
      borderColor: backgroundColor,
      color: textColor,
    },
    badgeLabel: {
      ...badgeCommon,
      borderRight: 0,
      borderColor: palette.neutral[800],
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
    },
  };
};

const Status = ({ type = STATUS_TYPE_RC }) => {
  const label = {
    [STATUS_TYPE_RC]: 'release candidate',
    [STATUS_TYPE_STABLE]: 'stable',
    [STATUS_TYPE_DEPRECATED]: 'deprecated',
    [STATUS_TYPE_EXPERIMENTAL]: 'experimental',
  }[type];
  const [classes] = useStyles(styles, { type });

  return (
    <div className={clsx(classes.badge, classes[type])}>
      <Typography element="span" className={classes.badgeLabel}>
        status
      </Typography>
      <Typography element="span" className={classes.badgeColor}>
        {label}
      </Typography>
    </div>
  );
};

Status.propTypes = {
  type: PropTypes.oneOf([
    STATUS_TYPE_RC,
    STATUS_TYPE_STABLE,
    STATUS_TYPE_DEPRECATED,
    STATUS_TYPE_EXPERIMENTAL,
  ]),
};

export default Status;
