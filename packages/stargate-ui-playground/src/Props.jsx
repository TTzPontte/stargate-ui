import React from 'react';
import { ArgsTable } from '@storybook/addon-docs/blocks';
import { Typography } from '@pontte/stargate-ui-core';

const Props = ({ component }) => (
  <React.Fragment>
    <Typography element="h4">
      Properties
    </Typography>

    <Typography>
      Properties spec for {component?.displayName || 'component'}.
    </Typography>

    <ArgsTable of={component} />
  </React.Fragment>
);

export default Props;
