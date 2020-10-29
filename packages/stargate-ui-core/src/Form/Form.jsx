import React from 'react';
import PropTypes from 'prop-types';
import FormContext from './FormContext';

const Form = (props) => {
  const { children, ...factoryProps } = props;

  const context = React.useMemo(() => ({}), []);

  return (
    <FormContext.Provider value={context}>
      <form {...factoryProps}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Form;
