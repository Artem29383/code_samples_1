import React, { memo } from 'react';
import numeral from 'numeral';

import * as Styled from './PropertyInfo.styled';
import { getPropertyTypeIcon } from 'utils/getPropertyTypeIcon';

type Props = {
  item: {
    bedrooms: number | undefined;
    bathrooms: number;
    livingSquareFeet: number;
    propertyType: string;
  };
};

const PropertyInfo = ({ item }: Props) => {
  return (
    <Styled.Line>
      <Styled.HouseIcon as={getPropertyTypeIcon(item.propertyType, false)} />
      <Styled.InfoNumber>
        <Styled.InfoNumberValue>{item.bedrooms}</Styled.InfoNumberValue>
        <Styled.InfoNumberTitle>Beds</Styled.InfoNumberTitle>
      </Styled.InfoNumber>
      <Styled.InfoNumber>
        <Styled.InfoNumberValue>{item.bathrooms}</Styled.InfoNumberValue>
        <Styled.InfoNumberTitle>Baths</Styled.InfoNumberTitle>
      </Styled.InfoNumber>
      <Styled.InfoNumber>
        <Styled.InfoNumberValue>
          {numeral(item.livingSquareFeet).format('0,0')}
        </Styled.InfoNumberValue>
        <Styled.InfoNumberTitle>Sq. Ft.</Styled.InfoNumberTitle>
      </Styled.InfoNumber>
    </Styled.Line>
  );
};

export default memo(PropertyInfo);
