/**
 * Inspired in the Material UI Grid.
 * {@link https://material-ui.com/components/grid}
 * {@link https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Grid/Grid.js}
 *
 * For better understanding of Flexbox, see the follow guide.
 * {@link https://css-tricks.com/snippets/css/a-guide-to-flexbox/}
 */
import React from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Factory from '../Factory';

const GRID_SPACINGS = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
];

const GRID_SIZES = [
  'auto',
  true,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
];

function getOffset(val, div = 1) {
  const parse = parseFloat(val);
  return `${parse / div}${String(val).replace(String(parse), '') || 'px'}`;
}

const styles = (theme) => {
  const { breakpoints } = theme;

  const gridRow = {
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    height: ({ fit }) => (
      fit && '100%'
    ),
    flexDirection: ({ direction }) => (
      direction
    ),
    alignItems: ({ alignItems }) => (
      alignItems
    ),
    alignContent: ({ alignContent }) => (
      alignContent
    ),
    justifyContent: ({ justifyContent }) => (
      justifyContent
    ),
  };

  const gridColSize = {
    ...Object.keys(breakpoints.screens).reduce((acc, screen) => ({
      ...acc,
      [`gridColSize-`+screen]: {
        [breakpoints.up(screen)]: {
          flexBasis: (props) => {
            const size = props[screen];

            if (size === true) {
              return 0;
            }

            if (size === 'auto') {
              return 'auto';
            }

            const width = `${Math.round((size / 12) * 10e7) / 10e5}%`;

            return width;
          },
          flexGrow: (props) => {
            const size = props[screen];

            return size === true ? 1 : 0;
          },
          maxWidth: (props) => {
            const size = props[screen];

            if (size === true) {
              return '100%';
            }

            if (size === 'auto') {
              return 'none';
            }

            const width = `${Math.round((size / 12) * 10e7) / 10e5}%`;

            return width;
          },
        },
      }
    }), {})
  };

  const setRowCollapse = ({ spacing, collapse }) => (
    !collapse && `-${getOffset(theme.spacing(spacing), 2)}`
  );

  const setColsGutter = ({ spacing }) => (
    getOffset(theme.spacing(spacing), 2)
  );

  const gridRowGutter = {
    marginLeft: setRowCollapse,
    marginRight: setRowCollapse,
    width: ({ spacing }) => (
      `calc(100% + ${getOffset(theme.spacing(spacing))})`
    ),
    /**
     * @todo check why refer $gridCol does not working
     */
    '& > *': {
      paddingLeft: setColsGutter,
      paddingRight: setColsGutter,
    },
  };

  const gridCol = {
    boxSizing: 'border-box',
    margin: 0,
    ...gridColSize.xs,
  };

  return {
    gridRow,
    gridCol,
    gridRowGutter,
    ...gridColSize,
  };
};

const Grid = React.forwardRef((props, ref) => {
  const {
    row,
    col,
    collapse,
    fit,
    className: inheritedClassName,
    alignContent = 'stretch',
    alignItems = 'stretch',
    direction = 'row',
    justifyContent = 'flex-start',
    lg = false,
    md = false,
    sm = false,
    xl = false,
    xs = false,
    spacing = 0,
    ...factoryProps
  } = props;

  const [
    {
      gridRow: classGridRow,
      gridRowGutter: classGridRowGutter,
      gridCol: classGridCol,
      ...classes
    }
  ] = useStyles(styles, {
    fit,
    collapse,
    alignContent,
    alignItems,
    direction,
    justifyContent,
    spacing,
    lg,
    md,
    sm,
    xl,
    xs,
  });

  const className = clsx(
    {
      [classGridRow]: row,
      [classGridRowGutter]: row,
      [classGridCol]: col,

      [classes[`gridColSize-xs`]]: xs !== false,
      [classes[`gridColSize-sm`]]: sm !== false,
      [classes[`gridColSize-md`]]: md !== false,
      [classes[`gridColSize-lg`]]: lg !== false,
      [classes[`gridColSize-xl`]]: xl !== false,

    },
    inheritedClassName,
  );

  return (
    <Factory
      ref={ref}
      className={className}
      {...factoryProps}
    />
  );
});

Grid.propTypes = {
  /**
   * @default stretch
   */
  alignContent: PropTypes.oneOf([
    'center',
    'flex-end',
    'flex-start',
    'space-around',
    'space-between',
    'stretch',
  ]),
  /**
   * @default stretch
   */
  alignItems: PropTypes.oneOf([
    'baseline',
    'center',
    'flex-end',
    'flex-start',
    'stretch',
  ]),
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
  row: PropTypes.bool,
  /**
   * @default row
   */
  direction: PropTypes.oneOf([
    'column-reverse',
    'column',
    'row-reverse',
    'row',
  ]),
  col: PropTypes.bool,
  /**
   * @default flex-start
   */
  justifyContent: PropTypes.oneOf([
    'center',
    'flex-end',
    'flex-start',
    'space-around',
    'space-between',
    'space-evenly',
  ]),
  /**
   * @default false
   */
  lg: PropTypes.oneOf(GRID_SIZES),
  /**
   * @default false
   */
  md: PropTypes.oneOf(GRID_SIZES),
  /**
   * @default false
   */
  sm: PropTypes.oneOf(GRID_SIZES),
  /**
   * @default 0
   */
  spacing: PropTypes.oneOf(GRID_SPACINGS),
  /**
   * @default false
   */
  xl: PropTypes.oneOf(GRID_SIZES),
  /**
   * @default false
   */
  xs: PropTypes.oneOf(GRID_SIZES),
};

export default Grid;
