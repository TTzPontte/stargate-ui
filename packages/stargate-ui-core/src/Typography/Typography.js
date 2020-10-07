import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

import Factory from '../Factory';
import Svg from '../Svg';

const TYPOGRAPHY_VARIANT_H1 = 'h1';
const TYPOGRAPHY_VARIANT_H2 = 'h2';
const TYPOGRAPHY_VARIANT_H3 = 'h3';
const TYPOGRAPHY_VARIANT_H4 = 'h4';
const TYPOGRAPHY_VARIANT_H5 = 'h5';
const TYPOGRAPHY_VARIANT_H6 = 'h6';
const TYPOGRAPHY_VARIANT_BODY = 'body';
const TYPOGRAPHY_VARIANT_BODYLOWER = 'bodylower';
const TYPOGRAPHY_VARIANT_SMALL = 'small';
const TYPOGRAPHY_VARIANT_TINY = 'tiny';

const TYPOGRAPHY_VARIANT = {
  [TYPOGRAPHY_VARIANT_H1]: 'h1',
  [TYPOGRAPHY_VARIANT_H2]: 'h2',
  [TYPOGRAPHY_VARIANT_H3]: 'h3',
  [TYPOGRAPHY_VARIANT_H4]: 'h4',
  [TYPOGRAPHY_VARIANT_H5]: 'h5',
  [TYPOGRAPHY_VARIANT_H6]: 'h6',
  [TYPOGRAPHY_VARIANT_BODY]: 'p',
  /**
   * @todo needs improvement
   */
  // [TYPOGRAPHY_VARIANT_BODYLOWER]: 'p',
  [TYPOGRAPHY_VARIANT_SMALL]: 'span',
  [TYPOGRAPHY_VARIANT_TINY]: 'small',
};

const styles = (theme) => {
  const {
    breakpoints,
    unit,
    maxWidth,
    typography: {
      fontFamily,
      fontSize,
      lineHeight,
      fontWeight,
    },
  } = theme;

  /**
   * @todo add support for custom color
   */
  const typography = {
    margin: 0,
    letterSpacing: .5,
    fontFamily: ({ variant }) => (
      theme.typography?.[variant].fontFamily || fontFamily
    ),
    fontSize: ({ variant }) => {
      theme.typography?.[variant].fontSize || fontSize
    },
    lineHeight: ({ variant }) => (
      theme.typography?.[variant].lineHeight || lineHeight
    ),
    fontWeight: ({ variant, weight }) => (
      weight || theme.typography?.[variant].fontWeight || fontWeight
    ),
    textTransform: ({ transform }) => (
      transform
    ),
    display: (props) => {
      const {
        variant,
        paragraph,
        display,
      } = props;

      return display || ((paragraph || [
        TYPOGRAPHY_VARIANT_H1,
        TYPOGRAPHY_VARIANT_H2,
        TYPOGRAPHY_VARIANT_H3,
        TYPOGRAPHY_VARIANT_H4,
        TYPOGRAPHY_VARIANT_H5,
        TYPOGRAPHY_VARIANT_H6,
        TYPOGRAPHY_VARIANT_BODY,
      ].includes(variant)) && 'block') || 'initial';
    },
  };

  const typographyQuote = {
    position: 'relative',
    zIndex: 2,
  };

  const typographyQuoteIcon = {
    position: 'absolute',
    opacity: .2,
    top: 0,
    left: 0,
    zIndex: 1,
    width: ({ variant }) => (
      (theme.typography?.[variant].fontSize || fontSize) * 4
    ),
  };

  const typographyFluid = ({ variant }) => {
    const fontVariant = theme.typography?.[variant];
    const { max, min } = fontVariant?.fontSizeFluid;
    const fontSize = unit.fluid(max, min, maxWidth);

    return {
      fontSize,
      [breakpoints.up('lg')]: {
        fontSize: theme.typography?.[variant].fontSize || fontSize,
      },
    }
  };

  return {
    typography,
    typographyQuote,
    typographyQuoteIcon,
    typographyFluid,
  };
};

const Typography = (props) => {
  const {
    color,
    display,
    transform,
    paragraph,
    gutter,
    quote,
    children,
    weight,
    fluid = true,
    variant: typographyVariant,
    element: elementTagString = 'p',
    className: inheritedClassName,
    ...factoryProps
  } = props;

  const typographyMapping = TYPOGRAPHY_VARIANT;
  const element = elementTagString || typographyMapping[typographyVariant];
  /**
   * @todo need to filter equal elements
   */
  const variant = typographyVariant || Object.keys(typographyMapping).reduce(
    (a, b) => typographyMapping[b] === elementTagString ? b : a
  );

  const [
    {
      typography: classTypography,
      typographyQuote: classTypographyQuote,
      typographyQuoteIcon: classTypographyQuoteIcon,
      typographyFluid: classTypographyFluid,
    },
  ] = useStyles(styles, {
    variant,
    transform,
    color,
    paragraph,
    gutter,
    display,
    weight,
  });
  const className = clsx(
    classTypography,
    {
      [classTypographyQuote]: quote,
      [classTypographyFluid]: fluid,
    },
    inheritedClassName,
  );

  const marginBottom = ((gutter || paragraph || [
    TYPOGRAPHY_VARIANT_H1,
    TYPOGRAPHY_VARIANT_H2,
    TYPOGRAPHY_VARIANT_H3,
    TYPOGRAPHY_VARIANT_H4,
    TYPOGRAPHY_VARIANT_H5,
    TYPOGRAPHY_VARIANT_H6,
    TYPOGRAPHY_VARIANT_BODY,
  ].includes(variant)) && (gutter ?? 2)) || 0;

  return (
    <Factory
      element={element}
      className={className}
      marginBottom={marginBottom}
      color={color}
      {...factoryProps}
    >
      {quote && (
        <Svg className={classTypographyQuoteIcon}>
          {/* @todo path does not fit */}
          <svg>
            <path fill="currentColor" transform="translate(-995.205 -1888.884)" d="M1004.8,1910.5h-9.6v-9.5c0-5.7,3.2-8.9,9.6-9.6v4.8
              c-3.1,0.1-4.7,1.7-4.8,4.8h4.8V1910.5z M1019.2,1910.5h-9.6v-9.5c0-5.7,3.2-8.9,9.6-9.6v4.8c-3.1,0.1-4.7,1.7-4.8,4.8h4.8V1910.5z"
            />
          </svg>
        </Svg>
      )}
      {children}
    </Factory>
  );
};

Typography.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * @default p
   */
  element: PropTypes.elementType,
  /**
   * @default TYPOGRAPHY_VARIANT_BODY
   */
  variant: PropTypes.oneOf([
    TYPOGRAPHY_VARIANT_H1,
    TYPOGRAPHY_VARIANT_H2,
    TYPOGRAPHY_VARIANT_H3,
    TYPOGRAPHY_VARIANT_H4,
    TYPOGRAPHY_VARIANT_H5,
    TYPOGRAPHY_VARIANT_H6,
    TYPOGRAPHY_VARIANT_BODY,
    TYPOGRAPHY_VARIANT_BODYLOWER,
    TYPOGRAPHY_VARIANT_SMALL,
    TYPOGRAPHY_VARIANT_TINY,
  ]),
  /**
   * @default inherit
   */
  transform: PropTypes.oneOf([
    'inherit',
    'initial',
    'uppercase',
    'lowercase',
    'capitalize',
  ]),
  /**
   * @default inherit
   */
  color: PropTypes.oneOf([
    'inherit',
    'initial',
    'primary',
    'secondary',
    'success',
    'warning',
    'error',
    'info',
  ]),
  paragraph: PropTypes.bool,
  /**
   * @default 2
   */
  gutter: PropTypes.number,
  /**
   * @default initial
   */
  display: PropTypes.oneOf([
    'initial',
    'inherit',
    'block',
    'inline',
  ]),
};

export default Typography;
