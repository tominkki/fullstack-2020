import { useState } from 'react';

const useField = type => {
  const [value, setValue] = useState('');

  const onChange = e => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    input: {
      type,
      value,
      onChange
    },
    reset
  };
};

const useVisibility = initial => {
  const [value, setValue] = useState(initial);

  const onClick = () => {
    setValue(!value);
  };

  return{
    value,
    btn:{
      onClick
    }
  };
};

export { useField, useVisibility };
