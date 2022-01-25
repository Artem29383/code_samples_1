import React, { useCallback, useEffect, useRef } from 'react';
import { MarginProps } from 'styled-system';

import * as Styled from './RangeInput.styled';

import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

type Props = {
  id: string;
  min: number;
  max: number;
  margin: number;
  start: [number, number];
  step: number;
  pickerWidth: number;
  pickerHeight?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  onChange: (values: [number, number]) => void;
} & MarginProps;

const RangeInput = ({
  id,
  decimals = 0,
  prefix = '',
  suffix = '',
  margin,
  step,
  start,
  min,
  max,
  pickerWidth,
  pickerHeight = 50,
  onChange,
  ...rest
}: Props) => {
  const slider = useRef<HTMLDivElement>(null);
  const querySelector = useCallback<(query: string) => HTMLDivElement>(
    (query: string) =>
      document.querySelector(`#${id} ${query}`) as HTMLDivElement,
    [id]
  );

  useEffect(() => {
    // @ts-ignore
    if (slider.current && !slider.current.noUiSlider) {
      // @ts-ignore
      noUiSlider.cssClasses.target += ' range-slider';

      noUiSlider.create(slider.current, {
        start,
        connect: true,
        behaviour: 'drag-tap',
        tooltips: [
          wNumb({ decimals, prefix, suffix }),
          wNumb({ decimals, prefix, suffix }),
        ],
        step,
        margin,
        range: {
          min,
          max,
        },
      });

      const rightLine = document.createElement('div');
      rightLine.classList.add('upper-extend-line');

      const leftLine = document.createElement('div');
      leftLine.classList.add('lower-extend-line');

      slider.current.appendChild(rightLine);
      slider.current.appendChild(leftLine);

      const rightPicker = querySelector(`.noUi-handle-upper`);
      // const leftPicker = querySelector(`.noUi-handle-lower`);

      const rightPickerContent = querySelector(
        `.noUi-handle-upper .noUi-touch-area`
      );
      const leftPickerContent = querySelector(
        `.noUi-handle-lower .noUi-touch-area`
      );

      const rightTooltip = querySelector(`.noUi-handle-upper .noUi-tooltip`);
      const leftTooltip = querySelector(`.noUi-handle-lower .noUi-tooltip`);

      const setPickersValues = () => {
        leftPickerContent.innerHTML = leftTooltip.innerHTML;
        rightPickerContent.innerHTML = rightTooltip.innerHTML;
      };

      const setLeftSide = () => {
        leftLine.style.left = `-${pickerWidth - 1}px`;
        leftLine.style.width = `${pickerWidth}px`;
        slider.current!.style.marginLeft = `${pickerWidth}px`;
      };

      const setRightSide = () => {
        rightPicker.style.right = `-${rightPicker.offsetWidth - 1}px`;
        rightLine.style.right = `-${pickerWidth - 1}px`;
        rightLine.style.width = `${pickerWidth}px`;
      };

      // @ts-ignore
      document.fonts.ready.then(() => {
        setPickersValues();
        setLeftSide();
        setRightSide();
      });

      // @ts-ignore
      slider.current.noUiSlider.on(
        'slide',
        (_: any, __: any, unencodedValues: [number, number]) => {
          setPickersValues();
          onChange([unencodedValues[0], unencodedValues[1]]);
        }
      );
    }
  }, [
    querySelector,
    decimals,
    max,
    min,
    margin,
    step,
    onChange,
    pickerWidth,
    prefix,
    start,
    suffix,
  ]);

  return (
    <Styled.Root
      pickerWidth={pickerWidth}
      pickerHeight={pickerHeight}
      {...rest}
    >
      <div id={id} ref={slider} />
    </Styled.Root>
  );
};

export default RangeInput;
