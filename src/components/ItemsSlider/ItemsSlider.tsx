import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import SwiperCore, { Controller, Navigation } from 'swiper';
import { MarginProps, MaxWidthProps } from 'styled-system';

import useToggle from 'hooks/useToggle';
import useInput from 'hooks/useInput';

import { range } from 'utils/range';

import { icons } from 'styles/icons';

import * as Styled from './ItemsSlider.styled';

SwiperCore.use([Navigation, Controller]);

type Props = {
  elements: number[];
  callback: (p: number) => void;
  className?: string;
  minWidthElement?: string;
  initialValue?: number;
  isEdit?: boolean;
  spaceBetween?: number;
} & MaxWidthProps &
  MarginProps;

const PencilIcon = icons.pencil;

const ONE_SYMBOL = 28;

const ItemsSlider = ({
  className,
  callback,
  elements = [],
  minWidthElement,
  initialValue,
  isEdit = false,
  spaceBetween = 15,
  ...rest
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [elemMinWidth, setElemWidthMin] = useState(minWidthElement);
  const $items = useRef(elements);
  const [items, setItems] = useState(elements);
  const [edit, setEdit] = useToggle(false);
  const { value, setValue, reset } = useInput('');
  const [swiper, setSwiper] = useState<{
    slideTo: (p: number) => void;
    update: () => void;
  } | null>(null);
  const isTransition = useRef(true);

  useEffect(() => {
    if (swiper) {
      if (initialValue != null) {
        swiper.slideTo($items.current.indexOf(initialValue));
      }
    }
  }, [swiper, initialValue, elements]);

  const handleChangeItems = () => {
    let slides;
    if (+value < 6) {
      slides = [...range(1, +value), ...range(+value + 1, +value + 150)];
    } else {
      slides = [
        ...range(+value - 5, +value),
        ...range(+value + 1, +value + 150),
      ];
    }
    setEdit();
    setItems(slides);
    $items.current = slides;
    setElemWidthMin(`${ONE_SYMBOL * value.length}px`);
    swiper!.update();
    callback(+value);
    swiper!.slideTo(slides.findIndex(elem => +value === +elem));
    reset();
  };

  const handleChangeItemsKey = (e: { key: string }) => {
    // @ts-ignore
    if (e.key === 'Enter') {
      handleChangeItems();
    }
  };

  const handleTransitionStopNext = useCallback(
    data => {
      setItems($items.current);
      callback($items.current[data.realIndex]);
      isTransition.current = false;
    },
    [callback]
  );

  const handleTransitionStopPrev = useCallback(
    data => {
      setItems($items.current);
      callback($items.current[data.realIndex]);
      isTransition.current = false;
    },
    [callback]
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
        {!edit &&
          items.map((m, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <SwiperSlide key={m + i}>
              <Styled.MonthName onClick={() => handleMonthChoose(m)}>
                {m}
              </Styled.MonthName>
            </SwiperSlide>
          ))}
        {edit && (
          <Styled.InputWrapper>
            <Styled.Input
              autoFocus
              value={value}
              onChange={setValue}
              type="number"
              onBlur={handleChangeItems}
              onKeyDown={handleChangeItemsKey}
            />
          </Styled.InputWrapper>
        )}
        <Styled.ShadowRight />
      </Styled.Slider>
      {!edit && isEdit && (
        <Styled.Edit onClick={setEdit}>
          <PencilIcon />
        </Styled.Edit>
      )}
    </Styled.Remote>
  );
};

export default ItemsSlider;
