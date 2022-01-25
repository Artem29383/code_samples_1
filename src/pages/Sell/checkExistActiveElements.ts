import React from 'react';

export const checkActiveElem = (
  prevState: {
    [key: number]: {
      active: boolean;
      serverValue: string;
      humanText: string;
      svg?: React.ElementType | keyof JSX.IntrinsicElements;
    };
  },
  activeElements: string | string[]
) =>
  Object.keys(prevState).reduce(
    (acc, key) => {
      acc[Number(key)] = activeElements.includes(
        prevState[Number(key)].serverValue
      )
        ? { ...prevState[Number(key)], active: true }
        : prevState[Number(key)];
      return acc;
    },
    { ...prevState }
  );
