import { useState, useEffect } from 'react';
import _debounce from 'lodash/debounce';

export default () => {
  const [{ width, height }, setDimensions] = useState<{
    width: number;
    height: number;
  }>(
    RUNTIME_ENV === 'server'
      ? { width: 0, height: 0 }
      : { width: window.innerWidth, height: window.innerHeight }
  );

  useEffect(() => {
    const resizeHandler = _debounce(
      () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      },
      500,
      { leading: false }
    );

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return { width, height } as const;
};
