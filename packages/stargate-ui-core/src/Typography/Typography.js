import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

import Factory from '../Factory';

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
  const { spacing } = theme;
  const {
    fontFamily,
    fontSize,
    lineHeight,
    fontWeight,
  } = theme.typography;

  /**
   * @todo add support for custom color
   */
  const typography = {
    margin: 0,
    letterSpacing: .5,
    fontFamily: ({ variant }) => (
      theme.typography?.[variant].fontFamily || fontFamily
    ),
    fontSize: ({ variant }) => (
      theme.typography?.[variant].fontSize || fontSize
    ),
    lineHeight: ({ variant }) => (
      theme.typography?.[variant].lineHeight || lineHeight
    ),
    fontWeight: ({ variant }) => (
      theme.typography?.[variant].fontWeight || fontWeight
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
    alignText: ({ align }) => (
      align
    ),
  };

  return {
    typography,
  };
};

const Typography = (props) => {
  const {
    color,
    display,
    transform,
    paragraph,
    gutter,
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

  const [classes] = useStyles(styles, {
    variant,
    transform,
    color,
    paragraph,
    gutter,
    display,
  });
  const className = clsx(Object.values(classes), inheritedClassName);
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
    />
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
  /**
   * @default inherit
   */
  align: PropTypes.oneOf([
    'inherit',
    'initial',
    'left',
    'right',
    'center',
    'justify',
  ]),
};

export default Typography;
