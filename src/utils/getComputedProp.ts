export const getComputedProp = (element: Element, property: string) => {
  if (typeof window !== 'undefined') {
    return window.getComputedStyle(element).getPropertyValue(property);
  }
  return '0px';
};
