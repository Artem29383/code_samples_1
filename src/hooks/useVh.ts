import { useEffect } from 'react';

const setVhVariable = () => {
  document.documentElement.style.setProperty(
    '--vh',
    `${window.innerHeight * 0.01}px`
  );
};

export default () => {
  useEffect(() => {
    setVhVariable();
    window.addEventListener('resize', setVhVariable);
  }, []);
};
