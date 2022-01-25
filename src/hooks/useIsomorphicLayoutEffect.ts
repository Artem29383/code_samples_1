import { useLayoutEffect, useEffect } from 'react';

const useIsomorphicLayoutEffect =
  RUNTIME_ENV === 'server' ? useEffect : useLayoutEffect;

export default useIsomorphicLayoutEffect;
