import { useState, useCallback } from 'react';

const useInput = (initValue: string) => {
  const [value, setValue] = useState<string>(initValue);
  const changeHandler = useCallback(
    e => {
      setValue(e.currentTarget.value);
    },
    [setValue]
  );

  const changeAutoCompleteHandler = useCallback(
    (e, values) => {
      setValue(values);
    },
    [setValue]
  );

  const setDefaultHandle = useCallback(defaultValue => {
    setValue(defaultValue);
  }, []);

  const reset = useCallback(() => setValue(''), [setValue]);

  return {
    value,
    setValue: changeHandler,
    setDefaultHandle,
    reset,
    changeAutoCompleteHandler,
  };
};

export default useInput;
