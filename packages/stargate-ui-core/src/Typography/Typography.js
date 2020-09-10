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

const styles = (theme) => {
  const { typography } = theme;

  return {
    typography: {
      textTransform: ({ transform: textTransform }) => textTransform,
    },
    [TYPOGRAPHY_VARIANT_H1]: typography.h1,
    [TYPOGRAPHY_VARIANT_H2]: typography.h2,
    [TYPOGRAPHY_VARIANT_H3]: typography.h3,
    [TYPOGRAPHY_VARIANT_H4]: typography.h4,
    [TYPOGRAPHY_VARIANT_H5]: typography.h5,
    [TYPOGRAPHY_VARIANT_H6]: typography.h6,
    [TYPOGRAPHY_VARIANT_BODY]: typography.body,
    [TYPOGRAPHY_VARIANT_BODYLOWER]: typography.bodylower,
    [TYPOGRAPHY_VARIANT_SMALL]: typography.small,
    [TYPOGRAPHY_VARIANT_TINY]: typography.tiny,
  };
};

const Typography = (props) => {
  const {
    paragraph,
    children,
    variant,
    transform = 'initial',
    type: elementTagString = 'p',
    ...factoryProps
  } = props;

  const typographyMapping = {
    [TYPOGRAPHY_VARIANT_H1]: 'h1',
    [TYPOGRAPHY_VARIANT_H2]: 'h2',
    [TYPOGRAPHY_VARIANT_H3]: 'h3',
    [TYPOGRAPHY_VARIANT_H4]: 'h4',
    [TYPOGRAPHY_VARIANT_H5]: 'h5',
    [TYPOGRAPHY_VARIANT_H6]: 'h6',
    [TYPOGRAPHY_VARIANT_BODY]: 'p',
    [TYPOGRAPHY_VARIANT_BODYLOWER]: 'p',
    [TYPOGRAPHY_VARIANT_SMALL]: 'span',
    [TYPOGRAPHY_VARIANT_TINY]: 'small',
  };
  const type = elementTagString || typographyMapping[variant] || 'span';
  const typographyVariant = variant || Object.keys(typographyMapping).reduce(
    (a, b) => typographyMapping[b] === elementTagString ? b : a
  );

  const [classes] = useStyles(styles, { transform });
  const className = clsx(classes.typography, classes[typographyVariant]);

  return (
    <Factory type={type} className={className} {...factoryProps}>
      {children}
    </Factory>
  );
};

Typography.propTypes = {
  children: PropTypes.node.isRequired,
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
  type: PropTypes.elementType,
  transform: PropTypes.oneOf([
    'uppercase',
    'lowercase',
    'initial',
    'capitalize',
  ]),
  paragraph: PropTypes.bool,
};

export default Typography;
