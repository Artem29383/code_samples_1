import { useEffect, useRef } from 'react';

export default () => {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
  }, []);

  return mounted;
};
