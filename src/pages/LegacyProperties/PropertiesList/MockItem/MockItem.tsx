import React, { useEffect, useRef, useState } from 'react';
import _debounce from 'lodash/debounce';

import { MarginProps } from '@types';

import * as Styled from './MockItem.styled';

type Props = {
  radius: number;
} & MarginProps;

export const MockItem = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handler = _debounce(
      () => {
        if (ref.current) {
          setWidth(ref.current.offsetWidth);
        }
      },
      1000,
      { leading: false }
    );

    setWidth((ref.current as HTMLDivElement).offsetWidth);

    window.addEventListener('resize', handler);
  }, []);

  return (
    <Styled.Root ref={ref} {...props} width={width}>
      <div />
    </Styled.Root>
  );
};

export default MockItem;
