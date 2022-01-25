import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { MaxWidthProps } from 'styled-system';

import useWindowResize from 'hooks/useWindowResize';

import { Viewport } from 'styles/media';

import * as S from './RangeSlider.styled';

type Props = {
  min?: number;
  max?: number;
  variants: { [key: string]: string };
  callback: (p: string) => void;
  initialValue?: number;
} & MaxWidthProps;

const getClosest = (points: number[], goal: number) => {
  const point = points.reduce((prev, curr) => {
    return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
  });
  const index = points.findIndex(p => p === point);
  return { point, index };
};

const RangeSlider = ({
  callback,
  variants,
  initialValue = 0,
  min = 0,
  max = 12,
  ...rest
}: Props) => {
  const [last, setLast] = useState(false);
  const $drag = useRef(false);
  const $node = useRef<HTMLDivElement>();
  const [dots, setDots] = useState(initialValue);
  const $dots = useRef(0);
  const { width: windowWidth } = useWindowResize();

  const handleDrag = useCallback(() => {
    $drag.current = true;
  }, []);

  const handleDragOff = useCallback(() => {
    const { point } = getClosest([0, 4, 8, max], $dots.current);
    $drag.current = false;
    setDots(point);
  }, [max]);

  useEffect(() => {
    if ($node.current) {
      $node.current.addEventListener('mousedown', handleDrag);
      document.addEventListener('mouseup', handleDragOff);
      $node.current.addEventListener('touchstart', handleDrag);
      document.addEventListener('touchend', handleDragOff);
    }
  }, [handleDrag, handleDragOff]);

  useEffect(() => {
    const { point } = getClosest([0, 4, 8, max], dots);
    callback(variants[point]);
  }, [callback, dots, max, variants]);

  const onMoveDots = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if ($drag.current) {
      setDots(Number(e.target.value));
      $dots.current = Number(e.target.value);
    }
  }, []);

  const generateStyles = (dot: number) => {
    return {
      left: {
        left: `${dot * (100 / max)}%`,
      },
      width: {
        width: `${dot * (100 / max)}%`,
      },
    };
  };

  const cssStyle = generateStyles(dots);

  useEffect(() => {
    if (!last) {
      setTimeout(() => {
        setLast(dots === max);
      }, 245);
    } else {
      setLast(dots === max);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dots, max]);

  return (
    <>
      <S.Slider last={last} {...rest}>
        <S.Input
          list="tickmarks"
          type="range"
          min={min}
          max={max}
          onChange={onMoveDots}
          value={dots}
          ref={$node}
        />
        ;
        <S.ProgressLine style={cssStyle.width} />
        <S.Dots dot={dots} style={cssStyle.left} />
      </S.Slider>
      {windowWidth >= Viewport.tablet && (
        <S.Range>
          <S.P position="absolute" left="1.3%">
            <span>|</span>
            <p>VERY QUICKLY</p>
          </S.P>
          <S.P position="absolute" left="32%">
            <span>|</span>
            <p> FEW WEEKS</p>
          </S.P>
          <S.P position="absolute" left="65.2%">
            <span>|</span>
            <p>FEW MONTHS</p>
          </S.P>
          <S.P position="absolute" left="98.6%">
            <span>|</span>
            <p>I’VE GOT TIME</p>
          </S.P>
        </S.Range>
      )}
    </>
  );
};

export default memo(RangeSlider);
