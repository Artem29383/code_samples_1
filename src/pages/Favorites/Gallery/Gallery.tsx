import React, { memo, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';

import { Routes } from '@types';
import { CollectionType } from 'models/favorites/types';

import Card from 'pages/Favorites/Gallery/Card';
import Text from 'components/Text';
import AppLink from 'components/AppLink';

import useWindowResize from 'hooks/useWindowResize';

import { Viewport } from 'styles/media';

import { NoResultsIcon } from 'styles/icons';

import * as Styled from './Gallery.styled';

type Props = {
  collection: CollectionType;
  ids: number[];
};

const imagePlaceholder = require('images/placeholder.jpg');

SwiperCore.use([Mousewheel]);

const Gallery = ({ collection, ids }: Props) => {
  const [controlledSwiper, setControlledSwiper] = useState<{
    slideTo: (index: number, speed?: number, runCallbacks?: boolean) => void;
  } | null>(null);
  const { width: windowWidth } = useWindowResize();

  return (
    <Styled.Root>
      {ids.length > 0 ? (
        <Styled.Slider
          onSwiper={setControlledSwiper}
          fullscreen="true"
          slidesPerView="auto"
          grabCursor
          freeMode
          mousewheel={{
            releaseOnEdges: true,
          }}
          spaceBetween={windowWidth < Viewport.tablet ? 20 : 10}
          pagination={{
            el: '.swiper-pagination-list',
            type: 'progressbar',
            clickable: true,
          }}
        >
          {ids.map((id, index) => (
            <SwiperSlide
              key={id}
              onClick={() => {
                controlledSwiper?.slideTo(index + 1);
              }}
            >
              <Card
                imageUrl={
                  collection[id].property.photo?.imageUrl || imagePlaceholder
                }
                id={collection[id].property.id}
                property={collection[id].property}
              />
            </SwiperSlide>
          ))}
        </Styled.Slider>
      ) : (
        <Styled.Empty>
          <NoResultsIcon width={{ m: 100, t: 200 }} height="auto" mb={20} />
          <Text
            as="h3"
            fontType="bwGradualBold"
            color="mineShaft"
            fontSize={20}
            mb={10}
          >
            Womp Womp.
          </Text>
          <Text
            as="div"
            fontType="liberGrotesqueBold"
            color="dovGray"
            fontSize={16}
            mb={20}
          >
            No favorites yet.
          </Text>
          &nbsp;
          <Text
            as="span"
            fontType="liberGrotesqueBlack"
            color="cornFlowerBlue"
            fontSize={16}
            cursor="pointer"
            textDecoration="underline"
          >
            <AppLink to={`${Routes.properties}?v=map-list`}>
              Add your first favorites.
            </AppLink>
          </Text>
        </Styled.Empty>
      )}
    </Styled.Root>
  );
};

export default memo(Gallery);
