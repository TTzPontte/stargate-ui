import React from 'react';
import { Typography, Link } from '@pontte/stargate-ui-core';

const createElement = (element, props = {}) => (docsComponentProps = {}) => (
  React.createElement(element, {
    ...props,
    ...docsComponentProps,
  })
);

const components = {
  h1: createElement(Typography, { element: 'h1', color: 'primary' }),
  h2: createElement(Typography, { element: 'h2' }),
  h3: createElement(Typography, { element: 'h3' }),
  h4: createElement(Typography, { element: 'h4' }),
  h5: createElement(Typography, { element: 'h5' }),
  h6: createElement(Typography, { element: 'h6' }),
  p: createElement(Typography, { variant: 'body' }),
  a: createElement(Link, { color: 'success', transform: 'initial' }),
};

const docs = { components };

export { docs };
