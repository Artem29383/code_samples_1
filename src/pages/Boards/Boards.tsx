import React from 'react';
import { NavLink } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';

import { Routes } from '@types';

import Text from 'components/Text';
import Spinner from 'components/Spinner';

import * as Styled from './Boards.styled';

import { Viewport } from 'styles/media';

type Props = {
  loading: boolean;
  list: {
    [key: number]: Array<{
      default: boolean;
      id: number;
      images: Array<{ id: number; url: string }>;
      title: string;
      totalImages: number;
    }>;
  };
  windowWidth: number;
};

const imagePlaceholder = require('images/placeholder.jpg');

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = imagePlaceholder;
};

SwiperCore.use([Mousewheel]);

const BoardsColumn = ({
  list,
  windowWidth,
}: {
  list: {
    [key: number]: Array<{
      default: boolean;
      id: number;
      images: Array<{ id: number; url: string }>;
      title: string;
      totalImages: number;
    }>;
  };
  windowWidth: number;
}) => {
  const listMap = Object.keys(list).reverse();
  return (
    <>
      {windowWidth >= Viewport.tablet ? (
        <Styled.Slider
          slidesPerView="auto"
          grabCursor
          freeMode
          mousewheel={{
            releaseOnEdges: true,
          }}
          spaceBetween={15}
          pagination={{
            el: '.swiper-pagination-list',
            type: 'progressbar',
            clickable: true,
          }}
        >
          {listMap.map((columnId, index) => (
            <SwiperSlide key={columnId}>
              <Column
                columnId={columnId}
                index={index}
                list={list}
                listMap={listMap}
              />
            </SwiperSlide>
          ))}
        </Styled.Slider>
      ) : (
        listMap.map((columnId, index) => (
          <Column
            key={columnId}
            columnId={columnId}
            index={index}
            list={list}
            listMap={listMap}
          />
        ))
      )}
    </>
  );
};

const Column = ({
  listMap,
  list,
  index,
  columnId,
}: {
  list: {
    [key: number]: Array<{
      default: boolean;
      id: number;
      images: Array<{ id: number; url: string }>;
      title: string;
      totalImages: number;
    }>;
  };
  index: number;
  columnId: string;
  listMap: string[];
}) => {
  return (
    <Styled.Column
      isEven={listMap.length % 2 === 0}
      isNumericLast={listMap.length === index + 1}
      /* eslint-disable-next-line react/no-array-index-key */
      key={index}
      direction={index % 2 === 0 ? 'column' : 'column-reverse'}
    >
      <Styled.Board
        height={{
          // d: '266px',
          d: '100%',
          m: list[(columnId as unknown) as number][1] ? '44.51vw' : '100%',
        }}
      >
        <NavLink
          to={`${Routes.boards}/${list[(columnId as unknown) as number][0].id}`}
        >
          {list[(columnId as unknown) as number][0].images[0]?.url ? (
            <Styled.Image
              src={list[(columnId as unknown) as number][0].images[0]?.url}
              onError={handleImageError}
            />
          ) : (
            <Styled.MockImage
              src={imagePlaceholder}
              onError={handleImageError}
            />
          )}
          <Styled.TitleWrapper>
            <Text
              color="white"
              fontSize={{ d: 26, m: 18 }}
              lineHeight={1}
              fontType="liberGrotesqueExtraBold"
              mb={7}
            >
              {list[(columnId as unknown) as number][0].title}
            </Text>
            <Text
              color="white"
              fontSize={{ d: 14, m: 12 }}
              lineHeight={1}
              fontType="liberGrotesqueExtraBold"
              mb={7}
            >
              {list[(columnId as unknown) as number][0].totalImages} Images
            </Text>
          </Styled.TitleWrapper>
        </NavLink>
      </Styled.Board>
      {list[(columnId as unknown) as number][1] && (
        <Styled.Board
          height={{
            // d: '380px',
            d: '100%',
            m: '67vw',
          }}
        >
          <NavLink
            to={`${Routes.boards}/${
              list[(columnId as unknown) as number][1].id
            }`}
          >
            {list[(columnId as unknown) as number][1].images[0]?.url ? (
              <Styled.Image
                onError={handleImageError}
                src={list[(columnId as unknown) as number][1].images[0]?.url}
              />
            ) : (
              <Styled.MockImage
                src={imagePlaceholder}
                onError={handleImageError}
              />
            )}
            <Styled.TitleWrapper>
              <Text
                color="white"
                fontSize={{ d: 26, m: 18 }}
                lineHeight={1}
                fontType="liberGrotesqueExtraBold"
                mb={7}
              >
                {list[(columnId as unknown) as number][1].title}
              </Text>
              <Text
                color="white"
                fontSize={{ d: 14, m: 12 }}
                lineHeight={1}
                fontType="liberGrotesqueExtraBold"
                mb={7}
              >
                {list[(columnId as unknown) as number][1].totalImages} Images
              </Text>
            </Styled.TitleWrapper>
          </NavLink>
        </Styled.Board>
      )}
    </Styled.Column>
  );
};

const Boards = ({ list, loading, windowWidth }: Props) => {
  return (
    <Styled.Root>
      {windowWidth > 1024 && (
        <Text
          fontSize={38}
          lineHeight={1}
          color="cornFlowerBlue"
          fontType="bwGradualBold"
          mb="38px"
        >
          Boards
        </Text>
      )}
      {loading ? (
        <Styled.Wrapper>
          <Spinner />
        </Styled.Wrapper>
      ) : (
        <Styled.Gallery>
          <BoardsColumn list={list} windowWidth={windowWidth} />
        </Styled.Gallery>
      )}
    </Styled.Root>
  );
};

export default Boards;
