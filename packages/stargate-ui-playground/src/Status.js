import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useStyles } from '@pontte/stargate-ui-styles';

const STATUS_TYPE_RC = 'rc';
const STATUS_TYPE_STABLE = 'stable';
const STATUS_TYPE_DEPRECATED = 'deprecated';
const STATUS_TYPE_EXPERIMENTAL = 'experimental';

const styles = (theme) => {
  const {
    spacing,
    radius,
    palette,
  } = theme;

  const borderRadius = radius();
  const badgeCommon = {
    border: [[1, 'solid']],
    padding: [[spacing(.5), spacing()]],
  };

  return {
    badge: {
      display: 'inline-block',
      borderRadius: radius(),
      marginBottom: spacing(),
    },
    badgeColor: {
      ...badgeCommon,
      color: palette.lighter,
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
    },
    badgeLabel: {
      ...badgeCommon,
      borderRight: 0,
      borderColor: palette.neutral[800],
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
    },
    [STATUS_TYPE_RC]: {
      '& $badgeColor': {
        color: palette.darkest,
        backgroundColor: palette.warning[0],
        borderColor: palette.warning[0],
      },
    },
    [STATUS_TYPE_STABLE]: {
      '& $badgeColor': {
        backgroundColor: palette.success[0],
        borderColor: palette.success[0],
      },
    },
    [STATUS_TYPE_DEPRECATED]: {
      '& $badgeColor': {
        backgroundColor: palette.error[0],
        borderColor: palette.error[0],
      },
    },
    [STATUS_TYPE_EXPERIMENTAL]: {
      '& $badgeColor': {
        backgroundColor: palette.info[0],
        borderColor: palette.info[0],
      },
    },
  };
};

const Status = ({ type = STATUS_TYPE_RC }) => {
  const classes = useStyles(styles);
  const label = {
    [STATUS_TYPE_RC]: 'release candidate',
    [STATUS_TYPE_STABLE]: 'stable',
    [STATUS_TYPE_DEPRECATED]: 'deprecated',
    [STATUS_TYPE_EXPERIMENTAL]: 'experimental',
  }[type];

  return (
    <div className={clsx(classes.badge, classes[type])}>
      <span className={classes.badgeLabel}>
        status
      </span>
      <span className={clsx(classes.badgeColor)}>
        {label}
      </span>
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
