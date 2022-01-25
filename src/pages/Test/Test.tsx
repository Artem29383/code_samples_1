import React from 'react';
import ItemsSlider from 'components/ItemsSliderFilters';
import styled from 'styled-components';
import {
  alignItems,
  AlignItemsProps,
  maxWidth,
  MaxWidthProps,
} from 'styled-system';
import { media } from 'styles/media';
import * as S from 'pages/Sell/FormSteps/Steps.styled';

export const ItemBox = styled.div<MaxWidthProps & AlignItemsProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 25px;
  ${maxWidth};
  ${alignItems};

  & .slider {
    //margin-left: 50%;
    //transform: translateX(-50%);
  }

  ${media.tablet`
    margin-bottom: 0;
  `}
`;

const Test = () => {
  return (
    <div>
      {/* <MultiSlider /> */}
      <S.ItemBox maxWidth={190}>
        <ItemsSlider
          initialValue="Any"
          callback={() => {}}
          minWidthElement="20px"
          elements={[
            'Any',
            '1',
            '1+',
            '2',
            '2+',
            '3',
            '3+',
            '4',
            '4+',
            '5',
            '5+',
            '6',
            '6+',
          ]}
        />
      </S.ItemBox>
    </div>
  );
};

export default Test;
