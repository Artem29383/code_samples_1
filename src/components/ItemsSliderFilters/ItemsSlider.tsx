// @ts-nocheck
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import SwiperCore, { Controller, Navigation } from 'swiper';
import { MarginProps, MaxWidthProps } from 'styled-system';

import * as Styled from './ItemsSlider.styled';

SwiperCore.use([Navigation, Controller]);

type Props = {
  elements: string[];
  callback: (p: number[]) => void;
  className?: string;
  minWidthElement?: string;
  initialValue?:
    | [{ rule: string; value: number }, { rule: string; value: number }]
    | { rule: string; value: number };
  isEdit?: boolean;
  spaceBetween?: number;
  isDays?: boolean;
} & MaxWidthProps &
  MarginProps;

const getResult = (value: string, isDays: boolean) => {
  if (!isDays) {
    if (value === 'Any') {
      return [
        { rule: 'gteq', value: 1 },
        { rule: 'lteq', value: 11 },
      ];
    }
    if (value[1] === '+') {
      return [
        { rule: 'gteq', value: +value[0] },
        { rule: 'lteq', value: 10 },
      ];
    }
    return [
      { rule: 'gteq', value: +value },
      { rule: 'lteq', value: +value },
    ];
  }
  if (value === 'Any') {
    return { rule: 'lt', value: String(500) };
  }
  if (value[2] === '+') {
    return { rule: 'lt', value: String(90) };
  }
  return {
    rule: 'lt',
    value: value
      .split('')
      .slice(1)
      .join(''),
  };
};

const ItemsSlider = ({
  className,
  callback,
  elements = [],
  minWidthElement,
  initialValue,
  spaceBetween = 15,
  isDays = false,
  ...rest
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [elemMinWidth, setElemWidthMin] = useState(minWidthElement);
  const $items = useRef(elements);
  const [items, setItems] = useState(elements);
  const [swiper, setSwiper] = useState<{
    slideTo: (p: number) => void;
    update: () => void;
  } | null>(null);
  const isTransition = useRef(true);

  useEffect(() => {
    if (swiper) {
      if (initialValue != null) {
        if (!isDays) {
          if (initialValue[1].value === 10) {
            swiper.slideTo($items.current.indexOf(`${initialValue[0].value}+`));
          } else if (initialValue[1].value === 11) {
            swiper.slideTo($items.current.indexOf(`Any`));
          } else {
            swiper.slideTo(
              $items.current.indexOf(String(initialValue[0].value))
            );
          }
        } else if (initialValue?.value === 500) {
          swiper.slideTo($items.current.indexOf(`Any`));
        } else if ([3, 7, 14, 30, 60].includes(initialValue?.value)) {
          swiper.slideTo($items.current.indexOf(`<${initialValue?.value}`));
        } else if (initialValue?.value === 90) {
          swiper.slideTo($items.current.indexOf(`${initialValue?.value}+`));
        }
      }
    }
  }, [swiper, initialValue, elements, isDays]);

  const handleTransitionStopNext = useCallback(
    data => {
      setItems($items.current);
      callback(getResult(String($items.current[data.realIndex]), isDays));
      isTransition.current = false;
    },
    [callback, isDays]
  );

  const handleTransitionStopPrev = useCallback(
    data => {
      setItems($items.current);
      callback(getResult(String($items.current[data.realIndex]), isDays));
      isTransition.current = false;
    },
    [callback, isDays]
  );

  const handleMonthChoose = useCallback(() => {
    if (isTransition.current) return;
    isTransition.current = true;
  }, []);

  return (
    <Styled.Remote className={className} {...rest}>
      <Styled.Slider
        {...rest}
        onSwiper={setSwiper}
        minWidthElement={elemMinWidth}
        centeredSlides
        slidesPerView="auto"
        slideToClickedSlide
        allowTouchMove
        onSlidePrevTransitionEnd={handleTransitionStopPrev}
        onSlideNextTransitionEnd={handleTransitionStopNext}
        grabCursor
        spaceBetween={spaceBetween}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
      >
        <Styled.ShadowLeft />
        {items.map((m, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <SwiperSlide key={m + i}>
            <Styled.MonthName onClick={() => handleMonthChoose(m)}>
              {m}
            </Styled.MonthName>
          </SwiperSlide>
        ))}
        <Styled.ShadowRight />
      </Styled.Slider>
    </Styled.Remote>
  );
};

export default ItemsSlider;
