import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Routes } from '@types';

import { actions } from 'models/properties';
import { useActionWithPayload } from 'hooks/useAction';
import { useSelector } from 'hooks/useSelector';
import {
  favLoadSelector,
  userFavoritesSelector,
} from 'models/properties/selectors';

import Text from 'components/Text';
import FavotiresMobile from 'pages/Dashboard/Widgets/Favorites/FavotiresMobile';

import useWindowResize from 'hooks/useWindowResize';

import * as Styled from './Favorites.styled';

import { HeartGrayIcon } from 'styles/icons';
import Item from 'pages/Dashboard/Widgets/Favorites/Item';

const Favorites = () => {
  const { width: windowWidth, height: windowHeight } = useWindowResize();
  const [activeIndex, setActiveIndex] = useState(0);
  const favorites = useSelector(userFavoritesSelector);
  const setLoadFav = useActionWithPayload(actions.setLoadFav);
  const isLoad = useSelector(favLoadSelector);
  const getFavoritesProperties = useActionWithPayload(
    actions.getFavoritesProperties
  );

  useEffect(() => {
    setLoadFav(true);
    getFavoritesProperties({
      page: 1,
      perPage: 3,
    });
  }, [getFavoritesProperties, setLoadFav]);
  // eslint-disable-next-line no-nested-ternary
  return windowWidth > 1024 ? (
    <Styled.Root>
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
      <Styled.Body>
        {favorites[0]?.property.id && (
          <Styled.ColumnOne>
            {favorites[0]?.property.id && (
              <NavLink to={`${Routes.properties}/${favorites[0]?.property.id}`}>
                <Item
                  isMr
                  isLoad={isLoad}
                  windowWidth={windowWidth}
                  windowHeight={windowHeight}
                  favorites={favorites[0]}
                />
              </NavLink>
            )}
            {favorites[1]?.property.id && (
              <NavLink to={`${Routes.properties}/${favorites[1]?.property.id}`}>
                <Item
                  isLoad={isLoad}
                  windowWidth={windowWidth}
                  windowHeight={windowHeight}
                  favorites={favorites[1]}
                />
              </NavLink>
            )}
          </Styled.ColumnOne>
        )}
        <Text
          position="absolute"
          bottom={-5}
          right={28}
          fontSize={14}
          lineHeight="14px"
          fontType="liberGrotesqueExtraBold"
          color="bombay"
        >
          <NavLink to={Routes.favorites}>See All Favorites</NavLink>
        </Text>
      </Styled.Body>
    </Styled.Root>
  ) : !isLoad ? (
    <FavotiresMobile
      favorites={favorites}
      setActiveIndex={setActiveIndex}
      activeIndex={activeIndex}
    />
  ) : null;
};

export default Favorites;
