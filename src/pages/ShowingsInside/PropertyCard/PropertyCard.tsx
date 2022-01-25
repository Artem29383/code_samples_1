import React, { memo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import numeral from 'numeral';

import Text from 'components/Text';
import Notes from 'pages/ShowingsInside/Notes';
import { Statuses, StatusesColor } from 'pages/Property/Property';

import * as Styled from './PropertyCard.styled';

type Props = {
  id: string;
  propertyId: number;
  imageUrl: string;
  address: string;
  bathroomsTotal: number;
  bedroomsTotal: number;
  listPrice: string;
  forShowing: boolean;
  livingAreaTotalSquareFeet: string;
  note: string | null;
  status: string;
};

const imagePlaceholder = require('images/placeholder.jpg');

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = imagePlaceholder;
};

const PropertyCard = ({
  propertyId,
  id,
  imageUrl,
  bedroomsTotal,
  bathroomsTotal,
  livingAreaTotalSquareFeet,
  listPrice,
  address,
  forShowing,
  note,
  status,
}: Props) => {
  const history = useHistory();

  const handleRedirect = useCallback(() => {
    if (forShowing) {
      history.push(`/properties/${propertyId}`);
    }
  }, [forShowing, history, propertyId]);

  return (
    <Styled.PropertyCard isActive={forShowing}>
      {!forShowing && <Styled.StatusShowing>Unavailable</Styled.StatusShowing>}
      <Styled.Card onClick={handleRedirect}>
        <Styled.WrapperImage>
          <Styled.Image src={imageUrl} onError={handleImageError} />
        </Styled.WrapperImage>
        <Styled.Content>
          <Styled.Props>
            <Styled.Prop>
              <Text
                fontSize={{ d: 27, m: 20 }}
                lineHeight={{ d: '27px', m: '20px' }}
                fontType="liberGrotesqueExtraBold"
              >
                {bedroomsTotal}
              </Text>
              <Text
                ml="6px"
                fontSize={{ d: '16px', m: '12px' }}
                lineHeight={{ d: '16px', m: '12px' }}
                fontType="liberGrotesqueExtraBold"
              >
                Bed
              </Text>
            </Styled.Prop>
            <Styled.Prop>
              <Text
                fontSize={{ d: 27, m: 20 }}
                lineHeight={{ d: '27px', m: '20px' }}
                fontType="liberGrotesqueExtraBold"
              >
                {bathroomsTotal}
              </Text>
              <Text
                ml="6px"
                fontSize={{ d: '16px', m: '12px' }}
                lineHeight={{ d: '16px', m: '12px' }}
                fontType="liberGrotesqueExtraBold"
              >
                Bath
              </Text>
            </Styled.Prop>
            <Styled.Prop>
              <Text
                fontSize={{ d: 27, m: 20 }}
                lineHeight={{ d: '27px', m: '20px' }}
                fontType="liberGrotesqueExtraBold"
              >
                {numeral(livingAreaTotalSquareFeet).format('0,0')}
              </Text>
              <Text
                ml="6px"
                fontSize={{ d: '16px', m: '12px' }}
                lineHeight={{ d: '16px', m: '12px' }}
                fontType="liberGrotesqueExtraBold"
              >
                Sq.Ft
              </Text>
            </Styled.Prop>
          </Styled.Props>
          <Styled.LowContent>
            <Text
              maxWidth="50%"
              fontSize={{ d: 16, m: 12 }}
              lineHeight={{ d: '23px', m: '16px' }}
              fontType="liberGrotesqueExtraBold"
            >
              {address}
            </Text>
            <Styled.Price color={StatusesColor[status]}>
              <Text
                fontSize={{ d: 27, m: 16 }}
                lineHeight={{ d: '27px', m: '16px' }}
                fontType="liberGrotesqueExtraBold"
              >
                ${numeral(listPrice).format('0,0')}
              </Text>
              <Text
                fontSize={{ d: 16, m: 12 }}
                lineHeight={{ d: '23px', m: '12px' }}
                fontType="liberGrotesqueExtraBold"
              >
                {Statuses[status]}
              </Text>
            </Styled.Price>
          </Styled.LowContent>
        </Styled.Content>
      </Styled.Card>
      <Notes id={id} note={note} />
    </Styled.PropertyCard>
  );
};

export default memo(PropertyCard);
