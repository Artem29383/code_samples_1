import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import { NavLink } from 'react-router-dom';
import { PositionProps, MarginProps, LayoutProps } from 'styled-system';
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  startOfMonth,
  addDays,
  isSameMonth,
  isSameDay,
} from 'date-fns';

import { Colors, Routes } from '@types';
import { Tour } from 'models/requests/types';

import Text from 'components/Text';
import DayCellComponent from './DayCell';
import TransparentScrollContainer from 'components/TransparentScrollContainer';

import * as Styled from './Calendar.styled';

import { CalendarIcon } from 'styles/icons';
import Spinner from 'components/Spinner';
import useWindowResize from 'hooks/useWindowResize';

type DayCell = {
  disabled: boolean;
  active: boolean;
  date: Date;
  tourDate: {
    date: Tour;
    timeRange: string;
  };
};

type Props = PositionProps &
  MarginProps &
  LayoutProps & {
    groupTours: { [key: number]: Tour };
    setMonth: (p: number) => void;
    isLoad: boolean;
    isListView: boolean;
  };

let maxHeightContent = 225;

const Calendar = (props: Props) => {
  const $calendar = useRef(null);
  const [preview, setPreview] = useState('calendar');
  const { groupTours, setMonth, isLoad, isListView } = props;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { width: windowWidth, height: windowHeight } = useWindowResize();

  useEffect(() => {
    setMonth(Number(format(currentDate, 'L')) - 1);
  }, [currentDate, setMonth]);

  const handleSetPrevMonth = useCallback(() => {
    setCurrentDate(subMonths(currentDate, 1));
  }, [currentDate, setCurrentDate]);

  const handleSetNextMonth = useCallback(() => {
    setCurrentDate(addMonths(currentDate, 1));
  }, [currentDate, setCurrentDate]);

  const handleSetSelectedDate = useCallback(
    (date: Date) => {
      setSelectedDate(date);
    },
    [setSelectedDate]
  );

  const daysOfWeek = useMemo(() => {
    const startOfTheWeek = startOfWeek(currentDate);

    return [...new Array(7)]
      .map((_, i) => addDays(startOfTheWeek, i), 'eee')
      .map(item => format(item, 'eee'));
  }, [currentDate]);

  const days = useMemo(() => {
    const startOfTheMonth = startOfMonth(currentDate);
    const startOfTheWeek = startOfWeek(startOfTheMonth);

    const iterator = (next: Date, rows: DayCell[][]): DayCell[][] => {
      if (!isSameMonth(next, startOfTheMonth) && rows.length > 0) {
        return rows;
      }

      const startOfTheNextWeek = addDays(next, 7);
      const row = [...new Array(7)]
        .map((_, i) => addDays(next, i))
        .map(item => {
          const tourDate = groupTours[Number(format(item, 'd'))]
            ? {
                date: groupTours[Number(format(item, 'd'))],
                timeRange: groupTours[Number(format(item, 'd'))].timeRange,
              }
            : false;
          return {
            disabled: !isSameMonth(item, startOfTheMonth),
            active: isSameDay(item, selectedDate),
            tourDate,
            date: item,
          };
        });
      // @ts-ignore
      return iterator(startOfTheNextWeek, [...rows, row]);
    };

    return iterator(startOfTheWeek, []);
  }, [currentDate, groupTours, selectedDate]);

  if (windowHeight > 800) {
    maxHeightContent = 280;
  } else if (windowHeight < 800 && windowWidth < 1024) {
    maxHeightContent = 280;
  } else {
    maxHeightContent = 225;
  }

  return (
    <Styled.Root {...props} ref={$calendar}>
      <Styled.Header>
        <CalendarIcon mb={12} color={Colors.bombay} />
        <Text
          textTransform="uppercase"
          fontType="liberGrotesqueBold"
          fontSize={10}
          color="bombay"
        >
          Calendar
        </Text>
      </Styled.Header>
      <Styled.MonthPicker>
        <Styled.Arrow dir="right" onClick={handleSetPrevMonth} />
        <Styled.Month>{format(currentDate, 'MMMM')}</Styled.Month>
        <Styled.Arrow dir="left" onClick={handleSetNextMonth} />
      </Styled.MonthPicker>
      {/* eslint-disable react/no-array-index-key */}
      {preview === 'calendar' && (
        <Styled.Week>
          {daysOfWeek.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </Styled.Week>
      )}
      {isLoad && (
        <Styled.Spinner>
          <Spinner />
        </Styled.Spinner>
      )}
      {preview === 'calendar'
        ? !isLoad && (
            <Styled.Days>
              {days.map((row, i) => (
                <Styled.DaysRow key={i}>
                  {row.map((item, j) => (
                    <DayCellComponent
                      key={j}
                      calendar={$calendar}
                      disabled={item.disabled}
                      active={item.active}
                      tourDate={item.tourDate}
                      date={item.date}
                      onClick={
                        !item.disabled ? handleSetSelectedDate : undefined
                      }
                      selectedDate={format(selectedDate, 'd')}
                    />
                  ))}
                </Styled.DaysRow>
              ))}
              {/* eslint-disable react/no-array-index-key */}
            </Styled.Days>
          )
        : !isLoad && (
            <Styled.ScheduleDays>
              <TransparentScrollContainer
                maxWidth="100%"
                width="100%"
                isOpen={preview === 'list'}
                id="transparent-modal-inspirations"
                maxContentHeight={maxHeightContent}
                mb={20}
              >
                <RenderScheduleDays days={days} />
              </TransparentScrollContainer>
            </Styled.ScheduleDays>
          )}
      {isListView && (
        <Styled.Modes>
          <Styled.Text
            active={preview === 'list'}
            onClick={() => setPreview('list')}
          >
            List View
          </Styled.Text>
          <Styled.Text
            active={preview === 'calendar'}
            onClick={() => setPreview('calendar')}
          >
            Calendar View
          </Styled.Text>
        </Styled.Modes>
      )}
      {!isListView && (
        <Text
          position="absolute"
          bottom={15}
          right={40}
          fontSize={14}
          lineHeight="14px"
          fontType="liberGrotesqueExtraBold"
          color="bombay"
          display={windowWidth < 1025 ? 'none' : 'block'}
        >
          <NavLink to={Routes.showings}>See All Showings</NavLink>
        </Text>
      )}
    </Styled.Root>
  );
};

const RenderScheduleDays = ({
  days,
}: {
  days: (Element | undefined)[][] | DayCell[][];
}) => {
  const renderDays: DayCell[] = [];
  const daysCells = days as DayCell[][];
  daysCells.forEach(row =>
    // eslint-disable-next-line array-callback-return
    row.map(item => {
      if (!item.disabled && item.tourDate) {
        renderDays.push(item);
      }
    })
  );

  if (renderDays.length === 0) {
    return (
      <Styled.Events>
        <Text fontType="liberGrotesqueBlack">No events yet</Text>
      </Styled.Events>
    );
  }

  return daysCells.map(row =>
    // eslint-disable-next-line array-callback-return,consistent-return
    row.map((item, j) => {
      if (!item.disabled && item.tourDate) {
        return (
          <NavLink
            key={j}
            to={`${Routes.showings}/date/${format(item.date, 'd')}-${format(
              item.date,
              'M'
            )}`}
          >
            <Styled.DayInScedule>
              <Styled.Line>
                <Text
                  fontSize={{ d: 16, m: 14 }}
                  lineHeight={{ d: '16px', m: '14px' }}
                  color="mineShaft"
                  fontType="liberGrotesqueBlack"
                  align="left"
                >
                  {format(item.date, 'EEEE, MMMM d')}
                </Text>
                <Text
                  fontSize={12}
                  lineHeight="12px"
                  color="mineShaft"
                  fontType="liberGrotesqueSemiBold"
                >
                  starting at
                </Text>
                <Text
                  fontSize={{ d: '16px', m: '14px' }}
                  lineHeight={{ d: '16px', m: '14px' }}
                  color="mineShaft"
                  align="right"
                  fontType="liberGrotesqueBlack"
                >
                  {
                    item.tourDate.date.startTourRequest.propertyTour
                      .preferredTimeSlot
                  }
                </Text>
              </Styled.Line>
              <Styled.Line>
                <Styled.TextUnderLine>
                  {item.tourDate.date.tourRequestsCount} Properties
                </Styled.TextUnderLine>
                <Styled.Reschedule>Reschedule</Styled.Reschedule>
              </Styled.Line>
            </Styled.DayInScedule>
          </NavLink>
        );
      }
    })
  );
};

export default Calendar;
