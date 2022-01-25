import React, { useCallback, useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useParams, useLocation } from 'react-router-dom';

import { Tour } from 'models/requests/types';

import { useActionWithPayload } from 'hooks/useAction';
import { actions } from 'models/requests';
import { useSelector } from 'hooks/useSelector';
import {
  groupToursSelector,
  loadSelector,
  toursCurrentDateSelector,
} from 'models/requests/selectors';

import ShowingsInside from 'pages/ShowingsInside/ShowingsInside';

import useWindowResize from 'hooks/useWindowResize';

const year = format(new Date(), 'yyyy');

const divisibleDays: {
  left: {
    [key: string]: Tour;
  };
  right: {
    [key: string]: Tour;
  };
} = {
  left: {},
  right: {},
};

const ShowingsInsideContainer = () => {
  const location = useLocation();
  const getGroupTours = useActionWithPayload(actions.getGroupTours);
  const setGroupTours = useActionWithPayload(actions.setGroupTours);
  const groupTours = useSelector(groupToursSelector);
  const getToursCurrentDate = useActionWithPayload(actions.getToursCurrentDate);
  const setToursCurrentDate = useActionWithPayload(actions.setToursCurrentDate);
  const [day, setDay] = useState<string | Date | null>(null);
  const [month, setMonth] = useState<string | Date | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState<string>('');
  const { collection, ids } = useSelector(toursCurrentDateSelector);
  const { time } = useParams();
  const { width: windowWidth } = useWindowResize();
  const setLoad = useActionWithPayload(actions.setLoad);
  const isLoad = useSelector(loadSelector);
  const [loadCards, setLoadCards] = useState(false);
  const [interval, setCustomInterval] = useState<{
    first: null | string;
    last: null | string;
    monthLeft: null | string;
    monthRight: null | string;
  }>({
    first: null,
    last: null,
    monthLeft: null,
    monthRight: null,
  });
  const [currentToursGroup, setCurrentToursGroup] = useState<{
    [key: string]: {
      [key: string]: Tour;
    };
  }>({});

  useEffect(() => {
    setLoadCards(false);
  }, [collection, ids]);

  const toFormat = useCallback(
    (tour: string, formatDate: string) => format(parseISO(tour), formatDate),
    []
  );

  const divIntervalsTours = useCallback(() => {
    const keys = Object.keys(groupTours);
    if (
      keys.length > 0 &&
      interval.monthLeft !== null &&
      interval.monthRight !== null &&
      interval.monthLeft === interval.monthRight
    ) {
      setCurrentToursGroup(prevState => ({
        ...prevState,
        [interval.monthLeft as string]: {
          ...prevState[interval.monthLeft as string],
          ...groupTours,
        },
      }));
    } else if (
      keys.length > 0 &&
      interval.monthLeft !== null &&
      interval.monthRight !== null &&
      interval.monthLeft !== interval.monthRight
    ) {
      keys.forEach((dayTour: string) => {
        const formatMonth = toFormat(
          groupTours[+dayTour].startTourRequest.propertyTour.tourDate,
          'M'
        );
        if (interval.monthLeft === formatMonth) {
          divisibleDays.left[
            toFormat(
              groupTours[+dayTour].startTourRequest.propertyTour.tourDate,
              'd'
            )
          ] = groupTours[+dayTour];
        } else {
          divisibleDays.right[
            toFormat(
              groupTours[+dayTour].startTourRequest.propertyTour.tourDate,
              'd'
            )
          ] = groupTours[+dayTour];
        }
      });

      setCurrentToursGroup(prevState => ({
        ...prevState,
        [interval.monthLeft as string]: {
          ...prevState[interval.monthLeft as string],
          ...divisibleDays.left,
        },
        [interval.monthRight as string]: {
          ...prevState[interval.monthRight as string],
          ...divisibleDays.right,
        },
      }));
    }
  }, [groupTours, interval.monthLeft, interval.monthRight, toFormat]);

  useEffect(() => {
    divIntervalsTours();
  }, [divIntervalsTours, groupTours]);

  useEffect(() => {
    setLoad(true);
    getGroupTours({
      tour_range_start: `${year}-${interval.monthLeft}-${interval.first}`,
      tour_range_finish: `${
        +interval.monthLeft! > +interval.monthRight! ? year + 1 : year
      }-${interval.monthRight}-${interval.last}`,
    });
    return () => {
      setGroupTours({});
    };
  }, [
    getGroupTours,
    setGroupTours,
    setLoad,
    interval.first,
    interval.last,
    interval.monthLeft,
    interval.monthRight,
  ]);

  useEffect(() => {
    return () => {
      setToursCurrentDate({
        collection: {},
        ids: [],
      });
    };
  }, [setToursCurrentDate]);

  useEffect(() => {
    if (time) {
      const dateObj = new Date();
      setDay(time.split('-')[0]);
      setMonth(time.split('-')[1]);
      if (day && month) {
        setDate(new Date(+year, +month - 1 < 0 ? 11 : +month - 1, +day));
        setCurrentDate(`${dateObj.getFullYear()}-${month}-${day}T0-0-0`);
      }
    }
  }, [time, day, month, location]);

  useEffect(() => {
    if (currentDate) {
      const splitPart = currentDate.split('T')[0].split('-');
      const chooseDate = new Date(
        Number(splitPart[0]),
        Number(+splitPart[1] - 1 < 0 ? 11 : +splitPart[1] - 1),
        Number(splitPart[2])
      ).getTime();
      setLoadCards(true);
      getToursCurrentDate({
        period: chooseDate < Date.now() ? 'past' : 'upcoming',
        date: currentDate.split('T')[0],
      });
    }
  }, [currentDate, getToursCurrentDate, setLoadCards]);

  return (
    <ShowingsInside
      isLoad={isLoad}
      isLoadCards={loadCards}
      date={date}
      setCurrentDate={setCurrentDate}
      collection={collection}
      ids={ids}
      windowWidth={windowWidth}
      setCustomInterval={setCustomInterval}
      currentToursGroup={currentToursGroup}
    />
  );
};

export default ShowingsInsideContainer;
