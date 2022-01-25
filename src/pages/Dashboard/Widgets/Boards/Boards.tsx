import React from 'react';
import _take from 'lodash/take';
import { NavLink } from 'react-router-dom';

import { Routes } from '@types';

import { BoardsList, BoardItem } from 'models/boards/selectors';

import Spinner from 'components/Spinner';
import Text from 'components/Text';

import { BoardsIcon } from 'styles/icons';

import * as Styled from './Boards.styled';

type Props = {
  loading: boolean;
  list: BoardsList;
  windowWidth: number;
};

const imagePlaceholder = require('images/placeholder.jpg');

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = imagePlaceholder;
};

const renderItem = (item: BoardItem) => (
  <Styled.Wrapper>
    <NavLink to={`${Routes.boards}/${item.id}`}>
      {item.images[0] ? (
        <img
          onError={handleImageError}
          src={item.images[0].url}
          alt={item.images[0].url}
        />
      ) : (
        <Styled.MockImage src={imagePlaceholder} onError={handleImageError} />
      )}
      <Styled.Info>
        <Text
          fontType="liberGrotesqueExtraBold"
          fontSize={16}
          color="white"
          mb={5}
        >
          {item.title}
        </Text>
        <Text fontType="liberGrotesqueExtraBold" fontSize={10} color="white">
          {item.totalImages} Images
        </Text>
      </Styled.Info>
    </NavLink>
  </Styled.Wrapper>
);

const Boards = ({ loading, list, windowWidth }: Props) => {
  const items = _take(list, 4);

  return (
    <Styled.Root>
      <Styled.Header>
        <BoardsIcon mb={12} />
        <Text
          textTransform="uppercase"
          fontType="liberGrotesqueBold"
          fontSize={10}
          color="bombay"
        >
          Boards
        </Text>
      </Styled.Header>
      {loading && (
        <Spinner
          position="absolute"
          top="50%"
          left="50%"
          hor="-50%"
          vert="-50%"
        />
      )}
      <Styled.Content>
        <Styled.ItemsChunk>
          <Styled.Item height={windowWidth < 1025 ? '37vw' : 168}>
            {items[0] && !loading && renderItem(items[0])}
          </Styled.Item>
          <Styled.Item height={windowWidth < 1025 ? '51vw' : 120}>
            {items[2] && !loading && renderItem(items[2])}
          </Styled.Item>
        </Styled.ItemsChunk>
        <Styled.ItemsChunk>
          <Styled.Item height={windowWidth < 1025 ? '51vw' : 168}>
            {items[1] && !loading && renderItem(items[1])}
          </Styled.Item>
          <Styled.Item height={windowWidth < 1025 ? '37vw' : 120}>
            {items[3] && !loading && renderItem(items[3])}
          </Styled.Item>
        </Styled.ItemsChunk>
      </Styled.Content>
      <Text
        position="absolute"
        bottom={15}
        right={40}
        fontSize={14}
        lineHeight="14px"
        fontType="liberGrotesqueExtraBold"
        color="bombay"
        display={windowWidth < 1025 ? 'none' : 'block'}
      >
        <NavLink to={Routes.boards}>See All Boards</NavLink>
      </Text>
    </Styled.Root>
  );
};

export default Boards;
