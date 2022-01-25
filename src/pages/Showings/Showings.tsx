import React from 'react';

import { Tour } from 'models/requests/types';

import Text from 'components/Text';
import Calendar from 'components/Calendar';

import * as Styled from './Showings.styled';

type Props = {
  groupTours: { [key: number]: Tour };
  setMonth: (p: number) => void;
  windowWidth: number;
  isLoad: boolean;
};

const Showings = ({ groupTours, setMonth, windowWidth, isLoad }: Props) => {
  return (
    <Styled.Root>
      {windowWidth > 1024 && (
        <Text
          fontSize={38}
          lineHeight="38px"
          fontType="bwGradualBold"
          color="cornFlowerBlue"
        >
          Showings
        </Text>
      )}
      <Styled.Widgets>
        <Styled.Calendar>
          <Calendar
            isListView
            isLoad={isLoad}
            groupTours={groupTours}
            setMonth={setMonth}
          />
        </Styled.Calendar>
      </Styled.Widgets>
    </Styled.Root>
  );
};

export default Showings;
