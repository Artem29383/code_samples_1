import React from 'react';

import { Property } from 'models/properties/types';

import PropertyInfo from 'pages/Dashboard/Widgets/Favorites/PropertyInfo/PropertyInfo';

import * as Styled from 'pages/Dashboard/Widgets/Favorites/Favorites.styled';
import { numericFormat } from 'utils/numericFormat';

const imagePlaceholder = require('images/placeholder.jpg');

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = imagePlaceholder;
};

type Props = {
  windowWidth: number;
  windowHeight: number;
  isLoad: boolean;
  favorites: {
    property: Property;
  };
  isMr?: boolean | undefined;
};

const Item = ({
  windowWidth,
  windowHeight,
  favorites,
  isLoad,
  isMr,
}: Props) => {
  return (
    <Styled.Item mr={isMr ? 30 : 0}>
      <Styled.Content
        sizes={{
          width: {
            m: 200,
            t: 290,
          },
          height: {
            m: 152,
            t: windowWidth > 1024 && windowHeight < 801 ? 200 : 270,
          },
        }}
      >
        <Styled.Image>
          {favorites?.property.photo ? (
            <Styled.SlideImage
              src={favorites.property.photo?.imageUrl}
              onError={handleImageError}
            />
          ) : (
            <Styled.MockImage
              src={imagePlaceholder}
              onError={handleImageError}
            />
          )}
        </Styled.Image>
        <Styled.Wrapper mt={10}>
          <PropertyInfo
            item={
              !isLoad
                ? {
                    propertyType: favorites?.property.propertyType,
                    bedrooms: favorites?.property.bedroomsTotal,
                    bathrooms: favorites?.property.bathroomsTotal,
                    livingSquareFeet: Number(
                      numericFormat(
                        String(favorites?.property.livingAreaTotalSquareFeet)
                      )
                    ),
                  }
                : {
                    propertyType: 'house',
                    bedrooms: 0,
                    bathrooms: 0,
                    livingSquareFeet: 0,
                  }
            }
          />
        </Styled.Wrapper>
      </Styled.Content>
    </Styled.Item>
  );
};

export default Item;
