import { useState, useCallback } from 'react';

export default (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(prevValue => !prevValue);
  }, []);

  return [value, toggle] as const;
};
