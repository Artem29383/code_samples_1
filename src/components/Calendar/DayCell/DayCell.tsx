import React, { memo, useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { CSSTransition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';

import { Tour } from 'models/requests/types';
import { Routes } from '@types';

import ToolTip from 'pages/Showings/ToolTip';

import * as Styled from './DayCell.styled';

type Props = {
  disabled: boolean;
  active: boolean;
  tourDate: {
    date: Tour;
    timeRange: string | false;
  };
  onClick: ((p: Date) => void) | undefined;
  date: Date;
  calendar: React.RefObject<HTMLDivElement>;
  selectedDate: string;
};

const DayCell = ({
  disabled,
  active,
  tourDate,
  onClick,
  date,
  calendar,
  selectedDate,
}: Props) => {
  const [activeToolTip, setActiveToolTip] = useState(false);

  useEffect(() => {
    if (!disabled && selectedDate === format(date, 'd') && tourDate.timeRange) {
      setActiveToolTip(true);
    }
    return () => {
      setActiveToolTip(false);
    };
  }, [date, disabled, selectedDate, tourDate.timeRange]);

  const handleToolTip = useCallback(() => {
    setActiveToolTip(false);
  }, []);

  return (
    <Styled.DayCell
      disabled={disabled || !tourDate}
      selected={selectedDate === format(date, 'd')}
      active={Boolean(active && !disabled && tourDate)}
      timeRange={tourDate && !disabled ? tourDate.timeRange : false}
      onClick={
        !disabled && tourDate && !activeToolTip
          ? () => (onClick ? onClick(date) : undefined)
          : handleToolTip
      }
    >
      <span>{format(date, 'd')}</span>
      <Styled.ToolTipWrapper>
        <NavLink
          to={`${Routes.showings}/date/${format(date, 'd')}-${format(
            date,
            'M'
          )}`}
        >
          <CSSTransition
            classNames="opacity"
            timeout={500}
            in={
              Boolean(
                !disabled &&
                  selectedDate === format(date, 'd') &&
                  tourDate.timeRange
              ) && activeToolTip
            }
            unmountOnExit
          >
            <ToolTip
              tourDate={tourDate}
              calendar={calendar}
              active={selectedDate === format(date, 'd')}
            />
          </CSSTransition>
        </NavLink>
      </Styled.ToolTipWrapper>
    </Styled.DayCell>
  );
};

export default memo(DayCell);
