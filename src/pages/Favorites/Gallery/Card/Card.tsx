import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { Property } from 'models/properties/types';

import PropertyInfo from 'pages/Favorites/Gallery/PropertyInfo/PropertyInfo';
import Text from 'components/Text';

import useBrowser from 'hooks/useBrowser';

import { cutStr } from 'utils/cutStr';

import * as Styled from './Card.styled';
import numeral from 'numeral';
import { Statuses, StatusesColor } from 'pages/Property/Property';

const imagePlaceholder = require('images/placeholder.jpg');

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = imagePlaceholder;
};

type Props = {
  imageUrl: string;
  property: Property;
  height?: string;
  heightImage?: string;
  id: number;
};

const Card = ({ imageUrl, id, property, height, heightImage }: Props) => {
  const { browser } = useBrowser();
  return (
    <Styled.Content height={height!}>
      <Styled.Image heightImage={heightImage!}>
        <Styled.SlideImage
          src={imageUrl}
          className="swiper-lazy"
          onError={handleImageError}
        />
      </Styled.Image>
      <Styled.Wrapper>
        <PropertyInfo item={property} />
        <Styled.InfoLine>
          <Styled.Address title={property.address}>
            <Styled.LineAddress>
              {cutStr(property.fullAddress.unparsedAddress, 22)}
            </Styled.LineAddress>
            <Styled.LineAddressMin>
              {`${property.fullAddress.postalCity}, ${property.fullAddress.stateOrProvince} ${property.fullAddress.postalCode}`}
            </Styled.LineAddressMin>
          </Styled.Address>
          <Styled.PriceAndStatus
            width={browser.name === 'Safari' ? '40%' : '36%'}
          >
            <Styled.Price color={StatusesColor[property.standardStatus]}>
              ${numeral(property.listPrice).format('0,0')}
            </Styled.Price>
            <Styled.Status color={StatusesColor[property.standardStatus]}>
              {Statuses[property.standardStatus]}
            </Styled.Status>
          </Styled.PriceAndStatus>
        </Styled.InfoLine>
      </Styled.Wrapper>
      <NavLink to={`/properties/${id}`}>
        <Styled.Button>
          <Text
            cursor="pointer"
            fontSize={{ m: '14px', t: '20px' }}
            lineHeight={{ m: '14px', t: '20px' }}
            fontType="liberGrotesqueRegular"
            color="white"
            align="center"
          >
            See Listing
          </Text>
        </Styled.Button>
      </NavLink>
    </Styled.Content>
  );
};

export default memo(Card);
