import React from 'react';
import { SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';

import Text from 'components/Text';
import Spinner from 'components/Spinner';

import * as Styled from './Board.styled';

import { Viewport } from 'styles/media';

type Props = {
  windowWidth: number;
  list: {
    [key: number]: Array<{
      id: number;
      note: null;
      photo: {
        id: number;
        image_url: string;
      };
    }>;
  };
  board: any;
  loading: boolean;
};

const imagePlaceholder = require('images/placeholder.jpg');

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = imagePlaceholder;
};

SwiperCore.use([Mousewheel]);

const BoardColumn = ({
  list,
  windowWidth,
}: {
  list: {
    [key: number]: Array<{
      id: number;
      note: null;
      photo: {
        id: number;
        image_url: string;
      };
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
                listMap={listMap}
                list={list}
                index={index}
                columnId={columnId}
              />
            </SwiperSlide>
          ))}
        </Styled.Slider>
      ) : (
        listMap.map((columnId, index) => (
          <Column
            key={columnId}
            listMap={listMap}
            list={list}
            index={index}
            columnId={columnId}
          />
        ))
      )}
    </>
  );
};

const Column = ({
  list,
  listMap,
  index,
  columnId,
}: {
  list: {
    [key: number]: Array<{
      id: number;
      note: null;
      photo: {
        id: number;
        image_url: string;
      };
    }>;
  };
  listMap: string[];
  index: number;
  columnId: string;
}) => {
  return (
    <Styled.Column
      isEven={listMap.length % 2 === 0}
      isNumericLast={listMap.length === index + 1}
      width={list[(columnId as unknown) as number][1] ? '42.645vw' : '100%'}
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
        {list[(columnId as unknown) as number][0]?.photo ? (
          <Styled.Image
            onError={handleImageError}
            src={list[(columnId as unknown) as number][0].photo.image_url}
          />
        ) : (
          <Styled.MockImage src={imagePlaceholder} onError={handleImageError} />
        )}
      </Styled.Board>
      {list[(columnId as unknown) as number][1] && (
        <Styled.Board
          height={{
            // d: '380px',
            d: '100%',
            m: '67vw',
          }}
        >
          <Styled.Image
            onError={handleImageError}
            src={list[(columnId as unknown) as number][1].photo.image_url}
          />
        </Styled.Board>
      )}
    </Styled.Column>
  );
};

const Board = ({ list, board, loading, windowWidth }: Props) => {
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
          {board.title}
        </Text>
      )}
      {loading ? (
        <Styled.Wrapper>
          <Spinner />
        </Styled.Wrapper>
      ) : (
        <Styled.Gallery>
          <BoardColumn list={list} windowWidth={windowWidth} />
        </Styled.Gallery>
      )}
    </Styled.Root>
  );
};

export default Board;
