/* eslint-disable import/no-unresolved */
import SwiperClass from 'swiper/types/swiper-class';
/* eslint-disable import/no-unresolved */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import _drop from 'lodash/drop';
import _dropRight from 'lodash/dropRight';

import { addDays, format, isSameDay, subDays } from 'date-fns';

import { Routes } from '@types';

import Text from 'components/Text';

import useWindowResize from 'hooks/useWindowResize';

import * as Styled from './Datepicker.styled';

type Props = {
  id: string;
  onGetDate: (p: string) => void;
  isDetectDate?: boolean;
  datePick?: Date;
  init?: boolean;
  setInit?: (p: boolean) => void;
};

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const Datepicker = ({
  id = 'datepicker',
  onGetDate,
  isDetectDate = false,
  datePick,
  init = false,
  setInit = () => {},
}: Props) => {
  const history = useHistory();
  const { width: windowWidth } = useWindowResize();
  const [currentDate, setCurrentDate] = useState(
    isDetectDate ? datePick : tomorrow
  );
  const startDate = subDays(currentDate as Date | number, 4);
  const [items, setItems] = useState(() =>
    [...new Array(9)].map((_, i) => addDays(startDate, i))
  );

  useEffect(() => {
    onGetDate(
      `${format(currentDate as Date | number, 'Y-M-d')}T${format(
        currentDate as Date | number,
        'H-m-s'
      )}`
    );
    if (isDetectDate) {
      history.push(
        `${Routes.showings}/date/${format(
          currentDate as number | Date,
          'd'
        )}-${format(currentDate as number | Date, 'M')}`
      );
    }
  }, [currentDate, history, isDetectDate, onGetDate]);

  const swiperRef = useRef<SwiperClass>();

  const itemsRef = useRef<Date[]>([]);
  const itemsTempRef = useRef(items);
  const isSwipe = useRef(false);

  const handleNextClick = useCallback(() => {
    swiperRef.current!.slideNext();
    isSwipe.current = true;
    itemsRef.current = [..._drop(items), addDays(items[items.length - 1], 1)];
  }, [items]);

  const handlePrevClick = useCallback(() => {
    swiperRef.current!.slidePrev();
    isSwipe.current = true;
    itemsRef.current = [subDays(items[0], 1), ..._dropRight(items)];
  }, [items]);

  const handleNextTransitionEnd = useCallback(() => {
    setItems(itemsRef.current);
    itemsTempRef.current = itemsRef.current;
    swiperRef.current!.slideTo(1, 0);
    isSwipe.current = false;
  }, []);

  const handlePrevTransitionEnd = useCallback(() => {
    setItems(itemsRef.current);
    itemsTempRef.current = itemsRef.current;
    swiperRef.current!.slideTo(1, 0);
    isSwipe.current = false;
  }, []);

  const handleSwipe = useCallback((data: SwiperClass) => {
    if (!isSwipe.current) {
      // @ts-ignore
      if (data.swipeDirection === 'next') {
        swiperRef.current!.slideNext();
        itemsRef.current = [
          ..._drop(itemsTempRef.current),
          addDays(itemsTempRef.current[itemsTempRef.current.length - 1], 1),
        ];
        isSwipe.current = true;
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        data.swipeDirection = '';
      }
      // @ts-ignore
      if (data.swipeDirection === 'prev') {
        swiperRef.current!.slidePrev();
        itemsRef.current = [
          subDays(itemsTempRef.current[0], 1),
          ..._dropRight(itemsTempRef.current),
        ];
        isSwipe.current = true;
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        data.swipeDirection = '';
      }
    }
  }, []);

  return (
    <Styled.Root>
      <Styled.Slider
        id={id}
        slidesPerView={7}
        spaceBetween={20}
        onSlideChange={handleSwipe}
        onSlidePrevTransitionEnd={handlePrevTransitionEnd}
        onSlideNextTransitionEnd={handleNextTransitionEnd}
        onSwiper={swiper => {
          swiperRef.current = swiper;
          swiperRef.current.slideTo(1, 0, false);
        }}
      >
        {items.map((item, indexItem) => (
          <SwiperSlide key={item.getTime()}>
            <Styled.Item
              isNotCursor={indexItem === 0 || indexItem === items.length - 1}
              active={
                isSameDay(
                  item,
                  isDetectDate
                    ? (datePick as Date | number)
                    : (currentDate as Date | number)
                ) && init
              }
              onClick={
                indexItem === 0 || indexItem === items.length - 1
                  ? () => {}
                  : () => {
                      setInit(true);
                      setCurrentDate(item);
                    }
              }
            >
              <Text
                cursor={
                  indexItem === 0 || indexItem === items.length - 1
                    ? 'default'
                    : 'pointer'
                }
                fontType="liberGrotesqueRegular"
                fontSize={{ d: '18px', m: '16px' }}
                color={
                  isSameDay(
                    item,
                    isDetectDate
                      ? (datePick as Date | number)
                      : (currentDate as Date | number)
                  ) && init
                    ? 'white'
                    : 'emperor'
                }
                mb={{ m: 20, t: 42 }}
                paddingTop={{ m: '16px', t: '38px' }}
              >
                {format(item, 'EEE')}
              </Text>
              <Styled.Text
                cursor={
                  indexItem === 0 || indexItem === items.length - 1
                    ? 'default'
                    : 'pointer'
                }
                active={
                  isSameDay(
                    item,
                    isDetectDate
                      ? (datePick as Date | number)
                      : (currentDate as Date | number)
                  ) && init
                }
                fontType="bwGradualBold"
                fontSize={{ d: '18px', m: '16px' }}
                color="mischka"
                mb={{ m: 20, t: 30 }}
              >
                {format(item, 'd')}
              </Styled.Text>
            </Styled.Item>
          </SwiperSlide>
        ))}
      </Styled.Slider>
      <Styled.Nav
        position="absolute"
        applyTransform={false}
        centerVert
        left={windowWidth < 769 ? -13 : -20}
        rotate={-135}
        onClick={handlePrevClick}
        // className={`swiper-prev-button-${id}`}
      />
      <Styled.Nav
        position="absolute"
        applyTransform={false}
        centerVert
        right={windowWidth < 769 ? -13 : -20}
        rotate={45}
        // className={`swiper-next-button-${id}`}
        onClick={handleNextClick}
      />
    </Styled.Root>
  );
};

export default Datepicker;
