import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { MaxWidthProps } from 'styled-system';
import throttle from 'lodash/throttle';

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
  max = 3,
  ...rest
}: Props) => {
  const [isDrag, setDrag] = useState(false);
  const $refDrag = useRef(false);
  const [dots, setDots] = useState(initialValue);
  const $sliderContainer = useRef();
  const { width: windowWidth } = useWindowResize();
  const $node = useRef<HTMLDivElement>();
  const $shift = useRef(0);
  const $way = useRef<number[]>(0);
  const [positionDot, setPositionDot] = useState<number | string>(0);
  const $position = useRef(0);

  const handleMove = useCallback((e: { clientX: number }) => {
    let position =
      e.clientX -
      $shift.current -
      $node.current?.getBoundingClientRect().width / 2;
    const rightSide =
      $sliderContainer.current.offsetWidth - $node.current.offsetWidth;
    if (position < 0) {
      position = 0;
    }
    if (position > rightSide) {
      position = rightSide;
    }
    if ($refDrag.current) {
      const { index } = getClosest($way.current, position);
      setPositionDot(position);
      $position.current = position;
      setDots(index);
    }
  }, []);

  const throttledEventHandler = useMemo(() => {
    return throttle(handleMove, 100);
  }, [handleMove]);

  const handleSetMoveEvent = useCallback(event => {
    event.preventDefault();
    setDrag(true);
    $refDrag.current = true;
  }, []);

  const handleDotEventReset = useCallback(() => {
    if ($node.current) {
      setDrag(false);
      $refDrag.current = false;
      const points = $way.current;
      const closes =
        getClosest(points, $position.current).point === 0
          ? 0
          : getClosest(points, $position.current).point -
            $node.current.getBoundingClientRect().width;
      const { index } = getClosest(points, $position.current);
      setDots(index);
      setPositionDot(closes);
    }
  }, []);

  useEffect(() => {
    if (isDrag) {
      document!.addEventListener('mousemove', throttledEventHandler);
    }
    return () => {
      document.removeEventListener('mousemove', throttledEventHandler);
    };
  }, [handleSetMoveEvent, isDrag, throttledEventHandler]);

  useEffect(() => {
    if ($node.current) {
      $shift.current = $node.current.getBoundingClientRect().left;
      $node.current.addEventListener('mousedown', handleSetMoveEvent);
      document.addEventListener('mouseup', handleDotEventReset);
      const width = $way.current.getBoundingClientRect().width / max;
      $way.current = [0, width, width * 2, width * 3];
    }
  }, [$node]);

  useEffect(() => {
    callback(variants[dots]);
  }, [callback, dots, variants]);

  const onMoveDots = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDots(Number(e.target.value));
    setPositionDot($way.current[Number(e.target.value)]);
    $position.current = $way.current[Number(e.target.value)];
  }, []);

  return (
    <>
      <S.Slider ref={$sliderContainer} last={dots === max} {...rest}>
        <S.Input
          ref={$way}
          list="tickmarks"
          type="range"
          min={min}
          max={max}
          onChange={onMoveDots}
          value={dots}
        />
        <S.ProgressLine
          width={`${positionDot +
            $node.current?.getBoundingClientRect().width}px`}
        />
        <S.Dots ref={$node} left={`${positionDot}px`} />
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
