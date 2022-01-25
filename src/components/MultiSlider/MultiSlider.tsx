/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import Cloud from 'components/MultiSlider/Cloud';

import * as S from './MultiSlider.styled';
import { MarginProps, MaxWidthProps, PaddingProps } from 'styled-system';

const THUMB_WIDTH = 24;

type Props = {
  min?: number;
  max?: number;
  betweenThumb?: number;
  minValueInitial: number;
  maxValueInitial: number;
  leftBorder: number;
  rightBorder: number;
  div: number;
  STEP?: number;
  suffixThousand?: string;
  onChange: (p: number[]) => void;
} & MaxWidthProps &
  PaddingProps &
  MarginProps;

const MultiSlider = ({
  min = 1,
  max = 100,
  minValueInitial = 90000,
  maxValueInitial = 2310000,
  STEP = 30000,
  div,
  leftBorder,
  rightBorder,
  onChange,
  suffixThousand = 'k',
  ...rest
}: Props) => {
  const [minVal, setMinVal] = useState<number>(0);
  const [maxVal, setMaxVal] = useState<number>(0);
  const minValRef = useRef<number>(0);
  const maxValRef = useRef<number>(0);
  const range = useRef<HTMLDivElement>(null);
  const $slider = useRef<HTMLDivElement>(null);
  const $leftDot = useRef<HTMLDivElement>(null);
  const $rightDot = useRef<HTMLDivElement>(null);
  const [leftCloud, setLeftCloud] = useState<number | string>(minValueInitial);
  const [rightCloud, setRightCloud] = useState<number | string>(
    maxValueInitial
  );
  const [between, setBetween] = useState(100);
  const [betweenThumb, setBetweenThumb] = useState(0);
  const [leftCloudEdit, setCloudEdit] = useState(false);
  const [rightCloudEdit, setCloudEditRight] = useState(false);
  const [isChangePosition, setChangePosition] = useState(true);

  useLayoutEffect(() => {
    const minValue = Math.floor(minValueInitial / STEP);
    const maxValue = Math.floor(
      maxValueInitial >= rightBorder ? max : maxValueInitial / STEP
    );
    setMaxVal(maxValue);
    maxValRef.current = maxValue;
    setMinVal(minValue);
    minValRef.current = minValue;
  }, [minValueInitial, maxValueInitial, STEP, rightBorder]);

  const handleChangeLeftCloud = (e: {
    target: {
      value: string;
    };
  }) => {
    if (String(e.target.value).length < 8) {
      setLeftCloud(e.target.value);
    }
  };

  const handleChangeRightCloud = (e: {
    target: {
      value: string;
    };
  }) => {
    if (String(e.target.value).length < 8) {
      setRightCloud(e.target.value);
    }
  };

  const handleConfirmRightInput = () => {
    if (+rightCloud - +STEP * +betweenThumb > leftCloud) {
      const number = Math.floor(+rightCloud / STEP);
      setMaxVal(number > max ? max : number);
      maxValRef.current = number > max ? max : number;
      setCloudEditRight(false);
    }
  };

  const handleConfirmLeftInput = () => {
    if (+leftCloud + +STEP * (+betweenThumb - 1) < rightCloud) {
      const number = Math.floor(leftCloud === 0 ? 1 : +leftCloud / STEP);
      setMinVal(number < 1 ? 1 : number);
      minValRef.current = number < 1 ? 1 : number;
      setCloudEdit(false);
    }
  };

  useLayoutEffect(() => {
    if ($slider.current) {
      const stepWidth = $slider.current.getBoundingClientRect().width / 100;
      setBetweenThumb(Math.floor(THUMB_WIDTH / stepWidth));
    }
  }, [$slider.current]);

  useLayoutEffect(() => {
    if ($leftDot.current && $rightDot.current && isChangePosition) {
      setBetween(
        $rightDot.current.getBoundingClientRect().left -
          $leftDot.current.getBoundingClientRect().left
      );
      setChangePosition(false);
      if (maxVal > 0) {
        if (suffixThousand) {
          onChange([
            minVal * STEP === leftBorder ? 0 : minVal * STEP,
            maxVal * STEP === rightBorder ? rightBorder * 10 : maxVal * STEP,
          ]);
        } else {
          onChange([minVal, maxVal]);
        }
      }
    }
  }, [minVal, maxVal, $leftDot.current, $rightDot.current, isChangePosition]);

  const handleGetValue = useCallback(
    (stepLeft: number, stepRight: number) => {
      setLeftCloud(stepLeft * STEP);
      setRightCloud(stepRight * STEP);
    },
    [STEP, onChange]
  );

  useEffect(() => {
    handleGetValue(minVal, maxVal);
  }, [minVal, maxVal, handleGetValue]);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current && $leftDot.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
      $leftDot.current.style.left = `${minPercent}%`;
      setChangePosition(true);
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current && $rightDot.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
      $rightDot.current.style.left = `${maxPercent}%`;
      setChangePosition(true);
    }
  }, [maxVal, getPercent]);

  return (
    <S.Root {...rest}>
      <S.SliderWrapper {...rest}>
        <S.Slider ref={$slider}>
          <S.Input
            type="range"
            min={min}
            max={max}
            events
            value={minVal}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value = Math.min(
                Number(event.target.value),
                maxVal - betweenThumb
              );
              setMinVal(value);
              minValRef.current = value;
            }}
            zIndex={3}
            // @ts-ignore
            style={{ zIndex: minVal > max - 100 && '5' }}
          />
          <S.Input
            events
            type="range"
            min={min}
            max={max}
            value={maxVal}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value = Math.max(
                Number(event.target.value),
                minVal + betweenThumb
              );
              setMaxVal(value);
              maxValRef.current = value;
            }}
            zIndex={4}
          />

          <S.Track />
          <S.Range ref={range}>
            <S.WrapperDotLeft ref={$leftDot}>
              <S.Dot thumbWidth={THUMB_WIDTH} />
              {between > 83 && (
                <Cloud
                  suffixThousand={suffixThousand}
                  step={STEP}
                  leftBorder={leftBorder}
                  rightBorder={rightBorder}
                  div={div}
                  label="from"
                  value={+leftCloud}
                  onChange={handleChangeLeftCloud}
                  isEdit={leftCloudEdit}
                  onEditEnd={handleConfirmLeftInput}
                  onEditStart={() => setCloudEdit(true)}
                />
              )}
            </S.WrapperDotLeft>
            <S.WrapperDotRight ref={$rightDot}>
              <S.DotRight thumbWidth={THUMB_WIDTH} />
              {between < 83 && (
                <Cloud
                  suffixThousand={suffixThousand}
                  leftBorder={leftBorder}
                  rightBorder={rightBorder}
                  div={div}
                  step={STEP}
                  label="from"
                  value={+leftCloud}
                  onChange={handleChangeLeftCloud}
                  isEdit={leftCloudEdit}
                  onEditEnd={handleConfirmLeftInput}
                  onEditStart={() => setCloudEdit(true)}
                  transform="translateX(-101%)"
                />
              )}
              <Cloud
                suffixThousand={suffixThousand}
                leftBorder={leftBorder}
                rightBorder={rightBorder}
                div={div}
                step={STEP}
                label="to"
                value={+rightCloud}
                onChange={handleChangeRightCloud}
                isEdit={rightCloudEdit}
                onEditEnd={handleConfirmRightInput}
                onEditStart={() => setCloudEditRight(true)}
              />
            </S.WrapperDotRight>
          </S.Range>
        </S.Slider>
      </S.SliderWrapper>
    </S.Root>
  );
};

export default memo(MultiSlider);
