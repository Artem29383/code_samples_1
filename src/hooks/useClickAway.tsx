import { useEffect, useState, useRef, useCallback } from 'react';

export default function useClickAway(initValue = false) {
  const [active, setActive] = useState(initValue);
  const ref = useRef(null);

  const toggle = useCallback(() => {
    setActive(!active);
  }, [active]);

  const handleClick = useCallback(e => {
    // @ts-ignore
    if (!ref.current!.contains(e.target)) {
      setActive(false);
    }
  }, []);

  useEffect(() => {
    if (active) document.addEventListener('mousedown', handleClick);
    else document.removeEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [active, handleClick]);

  return { ref, active, setActive, toggle };
}
