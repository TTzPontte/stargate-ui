import React from 'react';
import dedent from 'ts-dedent';
import { Source as StorybookSource } from '@storybook/addon-docs/blocks';

const Source = ({ language = 'jsx', snippet }) => {
  const code = dedent(snippet);

  return (
    <StorybookSource language={language} code={code} />
  );
};

export default Source;
