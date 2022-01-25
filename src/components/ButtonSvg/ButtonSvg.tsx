import React, { useCallback } from 'react';

import * as S from './ButtonSvg.styled';
import { HeightProps, MaxWidthProps } from 'styled-system';

type Props = {
  svg?: React.ElementType | keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  active: boolean;
  callback: (p: any) => void;
  id: string | number;
} & MaxWidthProps &
  HeightProps;

const ButtonSvg = ({ callback, id, active, svg, children, ...rest }: Props) => {
  const handleChange = useCallback(() => {
    callback((prev: any) => {
      const copy = { ...prev };
      copy[id].active = !copy[id].active;
      return copy;
    });
  }, [callback, id]);

  return (
    <S.Root active={active} onClick={handleChange} {...rest}>
      {svg && <S.Svg as={svg} />}
      <S.Text>{children}</S.Text>
    </S.Root>
  );
};

export default ButtonSvg;
