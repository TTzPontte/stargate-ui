import React, { Fragment } from 'react';

import Button from './Button';

const story = {
  title: 'Core/Button',
  component: Button,
  parameters: {},
};

const BasicUsage = () => (
  <Fragment>
    <Button>I'm the first component!</Button>
  </Fragment>
);

export { BasicUsage };
export default story;
