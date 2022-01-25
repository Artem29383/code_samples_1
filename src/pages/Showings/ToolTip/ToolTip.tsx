import React, { useEffect, useRef, useState } from 'react';

import { Tour } from 'models/requests/types';

import * as Styled from './ToolTip.styled';

type Props = {
  tourDate: {
    date: Tour;
    timeRange: string | false;
  };
  active: boolean;
  calendar: React.RefObject<HTMLDivElement>;
};

const ToolTip = ({ tourDate, calendar, active }: Props) => {
  const $toolTip = useRef<HTMLDivElement | null>(null);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [direction, setDirection] = useState('left');

  useEffect(() => {
    if ($toolTip.current && active && calendar.current) {
      setLeft(
        $toolTip.current.getBoundingClientRect().left -
          calendar.current.getBoundingClientRect().left
      );
      setRight(
        $toolTip.current.getBoundingClientRect().right -
          calendar.current.getBoundingClientRect().right
      );
    }
    return () => {
      setLeft(0);
      setRight(0);
      setDirection('left');
    };
  }, [active, calendar, $toolTip]);

  useEffect(() => {
    if (active) {
      if (left < 0) {
        setDirection('right');
      } else if (right < 0) {
        setDirection('left');
      }
    }
  }, [active, left, right]);

  return (
    <Styled.ToolTip
      ref={$toolTip}
      direction={direction}
      timeRange={tourDate.timeRange}
    >
      <Styled.Triangle direction={direction} />
      <Styled.Text>
        {tourDate && tourDate.date.tourRequestsCount} Properties
      </Styled.Text>
      {/* <Styled.Line> */}
      {/*  <Styled.ContactText> */}
      {/*    {tourDate && */}
      {/*      `${tourDate.date.startTourRequest.agent.firstName} ${tourDate.date.startTourRequest.agent.lastName}`} */}
      {/*  </Styled.ContactText> */}
      {/*  <Styled.Contact>Contact</Styled.Contact> */}
      {/* </Styled.Line> */}
    </Styled.ToolTip>
  );
};

export default ToolTip;
