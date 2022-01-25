import React from 'react';

import { Property } from 'models/properties/types';

import Text from 'components/Text';
import PropertyList from 'pages/Dashboard/Widgets/Favorites/PropertyList/PropertyList';

import * as Styled from './FavotiresMobile.styled';

import { HeartGrayIcon } from 'styles/icons';

type Props = {
  favorites: { property: Property }[];
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number;
};

const FavotiresMobile = ({ favorites, setActiveIndex, activeIndex }: Props) => {
  return (
    <Styled.RootMobile cutMr={favorites[0]?.property.id === undefined}>
      {!favorites[0]?.property.id && (
        <Styled.Text>Not Favorites yet</Styled.Text>
      )}
      <Styled.Header>
        <HeartGrayIcon mb={12} />
        <Text
          textTransform="uppercase"
          fontType="liberGrotesqueBold"
          fontSize={10}
          color="bombay"
        >
          Favorites
        </Text>
      </Styled.Header>
      {favorites[0]?.property.id && (
        <Styled.Gallery>
          <PropertyList
            entities={favorites}
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
          />
        </Styled.Gallery>
      )}
    </Styled.RootMobile>
  );
};

export default FavotiresMobile;
