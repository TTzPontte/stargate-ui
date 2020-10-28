import React from 'react';

import FormContext from './FormContext';

const Form = (props) => {
  const { children, ...factoryProps } = props;

  const context = React.useMemo(() => ({}), []);

  return (
    <FormContext.Provider value={context}>
      <form onSubmit={() => {}} {...factoryProps}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;
