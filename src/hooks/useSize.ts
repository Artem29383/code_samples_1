import _mapValues from 'lodash/mapValues';
import useLayout from 'hooks/useLayout';

export default <T extends Record<keyof T, number[] | (number | string)[]>>(
  sizes: T
) => {
  const isMobile = useLayout();
  return _mapValues(sizes, value => (isMobile ? value[0] : value[1]));
};
