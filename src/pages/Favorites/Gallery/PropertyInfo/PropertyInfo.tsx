import React, { memo } from 'react';
import numeral from 'numeral';

import { Property } from 'models/properties/types';

import * as Styled from './PropertyInfo.styled';
import { getPropertyTypeIcon } from 'utils/getPropertyTypeIcon';

type Props = {
  item: Property;
};

const PropertyInfo = ({ item }: Props) => {
  return (
    <Styled.Line>
      <Styled.HouseIcon as={getPropertyTypeIcon(item.propertyType, false)} />
      <Styled.InfoNumber>
        <Styled.InfoNumberValue>
          {item.bedroomsTotal || '0'}
        </Styled.InfoNumberValue>
        <Styled.InfoNumberTitle>Beds</Styled.InfoNumberTitle>
      </Styled.InfoNumber>
      <Styled.InfoNumber>
        <Styled.InfoNumberValue>
          {item.bathroomsTotal || '0'}
        </Styled.InfoNumberValue>
        <Styled.InfoNumberTitle>Baths</Styled.InfoNumberTitle>
      </Styled.InfoNumber>
      <Styled.InfoNumber>
        <Styled.InfoNumberValue>
          {numeral(item.livingAreaTotalSquareFeet).format('0,0')}
        </Styled.InfoNumberValue>
        <Styled.InfoNumberTitle>Sq. Ft.</Styled.InfoNumberTitle>
      </Styled.InfoNumber>
    </Styled.Line>
  );
};

export default memo(PropertyInfo);
